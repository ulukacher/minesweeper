const Cell = require("../db/cell");
const Game = require("../db/game");

const {HTTP_STATES} = require("../config/constants");
const { mapGameDBToGameDomain } = require("../mapper/game-mapper");



const createGameDB = async (game) => {


    try {

        //Se persistiría al juego en la BD

        const gameDB =  await Game.create({
            height: game.height,
            width: game.width,
            mines: game.mines
        });
    
        
        //Haríamos un bulk insert para insertar todas las celdas en una única operacion SQL
        //Hacer un insert por cada celda del tablero implicaría una degradación en la performance   
    
        let tablero = [[]];
        tablero = game.tablero;
        let cells = [];
        tablero.forEach( fila => {
            fila.forEach( c => {
                const {row, column, visible, value, hasQuestionMark, hasFlag} = c;
                cells.push({
                    visible,
                    row,
                    column,
                    value, 
                    hasQuestionMark,
                    hasFlag,
                    game_id: gameDB.id
                });
            })
        });
    
       console.log(cells);
       let resultBulk = await Cell.bulkCreate(cells);
       console.log(resultBulk);
    } catch (error) {
        throw {
            msg: "Error insertando al juego en la DB",
            statusCode: HTTP_STATES.INTERNAL_SERVER_ERROR
          } 
    }

    

}


const getGameFromDB = async(id) => {
    try {
        const gameDB = await Game.findByPk(id);
        
        if (!gameDB){
            throw {
                msg: `No existe usuario con el id ${id}`,
                statusCode: HTTP_STATES.INTERNAL_SERVER_ERROR
              } 
        }

        console.log({gameDB});
        const game = mapGameDBToGameDomain(gameDB);
        return game;


    } catch (error) {
        throw {
            msg: "Error obteniendo juego de la DB",
            statusCode: HTTP_STATES.INTERNAL_SERVER_ERROR
          } 
    }
    
}





module.exports = {
    createGameDB,
    getGameFromDB
}