const {response, request} = require('express');
const { validateCreateGameRequest, validatePlayGameRequest } = require('../helpers/gameHelper');
const Game = require('../models/game');
const {createGameDB} = require("../services/game-service");

let game = undefined;

const doPing = (req,res)=>{
    res.send("OK");
}


const createGame = (req,res = response) => {

    try {
        const {width, height, mines} = req.body;
        validateCreateGameRequest(height, width, mines);   
        
        // createGameDB(height, width, mines);

        game = new Game(height,width,mines);   
    
    
        console.log(game.tableroReal);
        const resultado = game.tableroDeUsuario;
    
    
        res.status(201).json({
            msg: "Juego creado!",
            width,
            height,
            mines,
            resultado
        })
    }
    catch(error){
        console.log("Error",error);
        res.status(error.statusCode || 500).json({
            error: error.msg || "Error inesperado"
        });
    }
    
}


const playGame = (req,res = response) => {
    try {
        const {id} = req.params.id;
        

        validatePlayGameRequest(req.body, game);

        const {fila, columna, accion = "T"} = req.body;

        let result = game.realizarAccionEnCelda(fila, columna, accion);
        console.log(result);
        res.json(result);
    } catch (error) {
        
        res.status(error.statusCode || 500).json({
            error: error.msg || "Error inesperado"
        });
    }
    
}

module.exports = {
    doPing,
    createGame,
    playGame
}