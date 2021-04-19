
const mapGameDBToGameDomain = (gameDB)=> {
    const {width, mines, height, state, id} = gameDB;
    let game = Object.assign({
        height,
        width,
        state,
        mines,
        id
    });

    return game;
}


module.exports = {
    mapGameDBToGameDomain
}