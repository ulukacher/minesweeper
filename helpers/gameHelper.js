const { BAD_REQUEST_STATUS_CODE } = require("./httpHelper");

const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


const validateCreateGameRequest = (height, width, mines)=>{

    if (!Number.isInteger(height) || !Number.isInteger(width) || !Number.isInteger(mines)){
      throw {
        msg: "Las filas, columnas y la cantidad de minas deben ser numeros enteros.",
        statusCode: BAD_REQUEST_STATUS_CODE
      }
      
      
    }

    if (height <= 0 || width <= 0 || mines <= 0 ){
      throw {
        msg: "Las filas, columnas y la cantidad de minas deben ser mayores a cero.",
        statusCode: BAD_REQUEST_STATUS_CODE
      }
       
    }    


    if (mines > height*width){
      throw {
        msg: "La cantidad de minas debe ser menor o igual que (filas*columnas).",
        statusCode: BAD_REQUEST_STATUS_CODE
      }
    }
    
}

const MINE_VALUE = 9;


module.exports = {
    randomValue,
    MINE_VALUE,
    validateCreateGameRequest
}