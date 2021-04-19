const { MINE_VALUE, ACTIONS_GAME, HTTP_STATES, STATES_GAME } = require("../config/constants");
const { randomValue } = require("../helpers/gameHelper");
const Cell = require("./cell");

class Game {

    constructor(height, width, mines){
        this.mines = mines;
        this.width = width;
        this.height= height;
        this.tablero = [[]];
        this.minasRestantes= mines;
        this.state = STATES_GAME.PENDING;
        this.inicializarTablero();
    
    }

    get tableroReal(){                  //El tablero con los valores reales
        return this.tablero.map( fila => { return fila.map(c => c.value);   });
    }

    
    get tableroDeUsuario(){           //El tablero que irá visualizando el usuario a lo largo del juego
        return this.tablero.map( fila => { return fila.map(c => c.userValue); });
    }
  

    get celdasNecesariasParaGanar(){ return this.width * this.height - this.mines;   }

    get celdasDestapadas(){
        let count = 0;
        this.tablero.forEach(fila => {
            count += fila.filter( (celda) => {
                return celda.visible && !celda.poseeMina;
            }).length;
        } )

        return count;
    }

    get enCurso(){
        return this.state == STATES_GAME.PENDING;
    }


    inicializarTablero(){
        this.tablero.shift();
        for (let i = 0; i < this.height; i++) {
            let fila = [];
            for (let j = 0; j < this.width; j++) {
                fila.push(new Cell(i,j));                
            }
            this.tablero.push(fila);
        }      

        this.ponerMinas();

    }

    ponerMinas(){
        let minasInsertadas = 0; 
        let fila;
        let columna;

        do {

            fila = randomValue(0,this.height-1);
            columna = randomValue(0,this.width-1);
        
            //Para no insertar una mina en una celda que ya tiene una mina

            while (this.tablero[fila][columna].poseeMina) {
                fila = randomValue(0,this.height-1);
                columna = randomValue(0,this.width-1);
            }                     

            this.tablero[fila][columna].value = MINE_VALUE;

            //Seteamos valores de las celdas adyacentes
            for (let filaPuntero = Math.max(0,fila-1); filaPuntero <= Math.min(this.height-1, fila+1); filaPuntero++) {
                for (let columnaPuntero = Math.max(0,columna-1); columnaPuntero <= Math.min(this.width-1, columna+1); columnaPuntero++) {
                    
                    let celdaAdyacente = this.tablero[filaPuntero][columnaPuntero];
                    
                    //Si la celda adyacente en cuestión no posee una mina, le sumamos 1
                    if (!celdaAdyacente.poseeMina) celdaAdyacente.value++;        

                }
                
            }

            minasInsertadas++;
            
        } while (minasInsertadas < this.mines);

        console.log("Tablero inicializado con minas.");
        console.log(this.tableroReal);


    }

    destaparCelda(fila, columna){
       let celda =  this.tablero[fila][columna];
    
       if (!celda.visible){
            celda.hasQuestionMark = false;
            celda.visible = true;

            //Si la celda seleccionada no tiene minas alrededor, destapamos aquellas celdas adyacentes que no poseen minas                

            if (celda.value == 0){  
                for (let filaPuntero = Math.max(0,fila-1); filaPuntero <= Math.min(this.height-1, fila+1); filaPuntero++) {
                    for (let columnaPuntero = Math.max(0,columna-1); columnaPuntero <= Math.min(this.width-1, columna+1); columnaPuntero++) {

                        const celdaAdyacente = this.tablero[filaPuntero][columnaPuntero];                       
                        
                        if (!celdaAdyacente.poseeMina) this.destaparCelda(filaPuntero, columnaPuntero);                      
                    }                    
                }
            }            
       }             

    }

    realizarAccionEnCelda(fila, columna, accion){
        console.log(`\nRealizar acción ${accion} en: fila ${fila}; Columna ${columna}\n`);

        fila = fila-1;
        columna = columna-1;
        let celda = this.tablero[fila][columna];
        switch (accion) {
            case ACTIONS_GAME.TAP:
                let result = this.click(celda);
                return result;

            case ACTIONS_GAME.FLAG:
                this.toggleFlag(celda);
                return {
                    tablero: this.tableroDeUsuario  ,
                    minasRestantes: this.minasRestantes              
                }
                    
            case ACTIONS_GAME.QUESTION_MARK:
                this.toggleQuestionMark(celda);
                return {
                    tablero: this.tableroDeUsuario  ,
                    minasRestantes: this.minasRestantes              
                }           
        }

        
        
    }

    click(celda){

        if(celda.hasFlag) {              //Para no clickear una celda donde se seteó una bandera
            return {
                tablero: this.tableroDeUsuario,
                minasRestantes: this.minasRestantes              
            }
        }          

        if(celda.poseeMina){
            console.log("Game over");
            this.state = STATES_GAME.LOSE;
            return {
                msg: "Perdiste :( :(",
                tablero: this.tableroReal
            };
        }
        else{
            this.destaparCelda(celda.row, celda.column);
            const result = this.verificarEstadoJuego();
            return result;            
        }  
    }

    verificarEstadoJuego() {

        if (this.celdasDestapadas == this.celdasNecesariasParaGanar){     
            this.state = STATES_GAME.WIN;
            return {
                msg: "GANASTE :) :)!!!!",
                tablero: this.tableroReal
            }
        }
        else{
            return {
                tablero: this.tableroDeUsuario  ,
                minasRestantes: this.minasRestantes              
            }
        }
    } 

    toggleFlag(celda){       
        
        if(celda.visible) return;

        console.log("Toggle flag");
        celda.hasFlag = !celda.hasFlag;
        
        //Si el usuario agrega una bandera, se decrementa la cantidad de minas restantes (desde el punto de vista del usuario)
        if(celda.hasFlag)
            this.minasRestantes--;
        else
            this.minasRestantes++;       

    }

    toggleQuestionMark(celda){
        if(celda.visible) return;

        console.log("Toggle question mark");

        celda.hasQuestionMark = !celda.hasQuestionMark;      
    }     


}


module.exports = Game;