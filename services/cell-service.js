const Cell = require("../db/cell");
const { mapCellDBToCellDomain } = require("../mapper/cell-mapper");

const getCellByCoordinates = async(row, column, game_id) => {
    const cellDB = await Cell.findOne({where: 
        {
            row: row,
            column: column,
            game_id: game_id
        }
    });

    const cell = mapCellDBToCellDomain(cellDB);
    console.log({cell});


}

module.exports = {
    getCellByCoordinates
}