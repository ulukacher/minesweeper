const {response, request} = require('express')


const doPing = (req,res)=>{
    res.send("OK");
}


const createGame = (req,res = response) => {
    const {width, height, mines} = req.body;
    res.status(201).json({
        msg: "Juego creado",
        width,
        height,
        mines
    })
}


const playGame = (req,res = response) => {
    const {id} = req.params.id;
    const {x, y} = req.body
    res.json({
        msg: "Jugando buscaminas",
        id,
        x,
        y
    })
}



module.exports = {
    doPing,
    createGame,
    playGame
}