const Game = require("../db/game");



const createGameDB = async (height, width, mines) => {

    const game =  await Game.create({
        height,
        width,
        mines
    });

    console.log({game});
    

}

module.exports = {
    createGameDB
}