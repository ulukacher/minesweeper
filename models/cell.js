const { MINE_VALUE } = require("../helpers/gameHelper");

class Cell{
    
    
    constructor(row, column){
        this.visible = false;
        this.value = 0;
        this.row = row;
        this.column = column;
        
    }

    // Si el usuario no destapó la celda, no se le debe mostrar el valor
    get userValue(){
        return this.visible ? this.value.toString() : '#'
    }

    get poseeMina(){
        return this.value == MINE_VALUE;
    }
}


module.exports = Cell;