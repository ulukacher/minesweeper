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

        //TODO: en un esquema de persistencia, se invocaría al service para almacenar la partida en la BD        
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


const playGameId = async(req,res = response) => {
    try {
        const {id} = req.params;
        console.log({id});

        const {fila, columna, accion = "T"} = req.body;

        // const gameFetched = await getGameFromDB(id);
        // console.log({gameFetched});

        // const cellFetched = await getCellByCoordinates(fila-1, columna-1, id);
        // console.log({cellFetched});

        //TODO: realizar acciones sobre las celdas y persistirlas

        res.json({
            msg: "Este sería el endpoint para jugar una partida espeficando un id"
        });
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