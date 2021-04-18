const { randomValue, MINE_VALUE } = require("../helpers/gameHelper");
const Cell = require("./cell");

class Game {

    constructor(height, width, mines){
        this.mines = mines;
        this.width = width;
        this.height= height;
        this.tablero = [[]];
       
        this.inicializarTablero();
    
    }

    get tableroReal(){                  //El tablero con los valores reales
        return this.tablero.map( fila => {
            return fila.map(c => c.value);
        });
    }

    
    get tableroDeUsuario(){             //El tablero que irá visualizando el usuario a lo largo del juego

        return this.tablero.map( fila => {
            return fila.map(c => c.userValue);
        });
    }

   

    get celdasNecesariasParaGanar(){
        return this.width * this.height - this.mines;
    }

    get celdasDestapadas(){
        let count = 0;
        this.tablero.forEach(fila => {
            count += fila.filter( (celda) => {
                return celda.visible && !celda.poseeMina;
            }).length;
        } )

        return count;
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

        console.log("Tablero inicializado con minas");
        console.log(this.tablero);

    }

    destaparCelda(fila, columna){
       let celda =  this.tablero[fila][columna];
    
       if (!celda.visible){
            celda.visible = true;

            //Si la celda  seleccionada no tiene minas alrededor, destapamos aquellas celdas adyacentes que no poseen minas                

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

    clickearCelda(fila, columna){
        fila = fila-1;
        columna = columna-1;
        let celda = this.tablero[fila][columna];

        if(celda.poseeMina){
            return {
                msg: "Perdiste :( :(",
                tablero: this.tableroReal
            };
        }
        else{
            this.destaparCelda(fila, columna);
            const result = this.verificarEstadoJuego();
            return result;            
        }   
        

    }

    verificarEstadoJuego() {
        console.log("destapadas:", this.celdasDestapadas);
        console.log("need to win:",this.celdasNecesariasParaGanar);

        if (this.celdasDestapadas == this.celdasNecesariasParaGanar){
            return {
                msg: "GANASTE :) :)!!!!",
                tablero: this.tableroReal
            }
        }
        else{
            return {
                tablero: this.tableroDeUsuario                
            }
        }

    }
   


}


module.exports = Game;