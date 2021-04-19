const Cell = require("../models/cell")

const mapCellDBToCellDomain = (cellDB)=> {
    const {visible,value,row,column, hasQuestionMark, hasFlag} = cellDB;
    

    let cell = Object.assign({
        visible,
        value,
        row,
        column,
        hasQuestionMark,
        hasFlag
    })   
      
    return cell;
}

module.exports = {
    mapCellDBToCellDomain
}