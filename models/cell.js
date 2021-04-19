const { ACTIONS_GAME, MINE_VALUE } = require("../config/constants");




class Cell{
    
    
    constructor(row, column){
        this.visible = false;
        this.value = 0;
        this.row = row;
        this.column = column;
        this.hasQuestionMark = false;
        this.hasFlag = false;
        
    }

    // El contenido de la celda que se le mostrará al usuario
    get userValue(){
        if(this.hasFlag){
            return ACTIONS_GAME.FLAG;
        }
        else if (this.hasQuestionMark){
            return ACTIONS_GAME.QUESTION_MARK;
        }
        else {
            return this.visible ? this.value.toString() : '#';
        }


        
    }

    get poseeMina(){
        return this.value == MINE_VALUE;
    }
}


module.exports = Cell;