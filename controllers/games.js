const {response, request} = require('express');
const { validateCreateGameRequest, validatePlayGameRequest } = require('../helpers/gameHelper');
const Game = require('../models/game');
const { getCellByCoordinates } = require('../services/cell-service');
const {createGameDB, getGameFromDB} = require("../services/game-service");

let game = undefined;

const doPing = (req,res)=>{
    res.send("OK");
}


const createGame = (req,res = response) => {

    try {
        const {width, height, mines} = req.body;
        validateCreateGameRequest(height, width, mines);   
        
        game = new Game(height,width,mines);   
        
        // createGameDB(game);

    
    
        console.log(game.tableroReal);
        const resultado = game.tableroDeUsuario;
    
    
        res.status(201).json({
            msg: "Juego creado!",
            width,
            height,
            mines,
            tableroInicializado: resultado
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

              
        validatePlayGameRequest(req.body, game);

        const {fila, columna, accion = "T"} = req.body;

        let result = game.realizarAccionEnCelda(fila, columna, accion);
        console.log(result);
        res.json(result);


    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            error: error.msg || "Error inesperado"
        });
    }
    
}


const playGameId = (req,res = response) => {
    try {
        const {id} = req.params;
        console.log({id});
        
        getGameFromDB(id);

        validatePlayGameRequest(req.body, game);

        const {fila, columna, accion = "T"} = req.body;

        getCellByCoordinates(fila, columna, id);

        let result = game.realizarAccionEnCelda(fila, columna, accion);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            error: error.msg || "Error inesperado"
        });
    }
    
}


module.exports = {
    doPing,
    createGame,
    playGame,
    playGameId
}