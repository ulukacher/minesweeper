const {response, request} = require('express');
const { validateCreateGameRequest } = require('../helpers/gameHelper');
const Game = require('../models/game');


let game = undefined;

const doPing = (req,res)=>{
    res.send("OK");
}


const createGame = (req,res = response) => {

    try {
        const {width, height, mines} = req.body;
        validateCreateGameRequest(height, width, mines);    
        game = new Game(height,width,mines);   
    
    
        console.log(game.tableroReal);
        const resultado = game.tableroDeUsuario;
    
    
        res.status(201).json({
            msg: "Juego creado",
            width,
            height,
            mines,
            resultado
        })
    }
    catch(error){

        res.status(error.statusCode).json({
            error: error.msg
        });
    }
    
}


const playGame = (req,res = response) => {
    try {
        const {id} = req.params.id;
        const {fila, columna} = req.body

        let result = game.clickearCelda(fila, columna);
        console.log(result);
        res.json(result);
    } catch (error) {
        
        res.status(500).json({
            error
        });
    }
    
}





module.exports = {
    doPing,
    createGame,
    playGame
}