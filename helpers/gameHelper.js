const {HTTP_STATES, ACTIONS_ACCEPTED } = require("../config/constants");


const randomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const validateCreateGameRequest = (height, width, mines)=>{

    if (!Number.isInteger(height) || !Number.isInteger(width) || !Number.isInteger(mines)){
      throw {
        msg: "Las filas, columnas y la cantidad de minas deben ser numeros enteros.",
        statusCode: HTTP_STATES.BAD_REQUEST
      }      
      
    }

    if (mines < 1) {
      throw {
        msg: "Deeb haber al menos una mina.",
        statusCode: HTTP_STATES.BAD_REQUEST
      }
    }

    if (height < 3 || width <= 2){
      throw {
        msg: "El tablero deber ser -como mínimo- de 3x3. ",
        statusCode: HTTP_STATES.BAD_REQUEST
      }
       
    }    

    if (mines > height * width){
      throw {
        msg: "La cantidad de minas debe ser menor o igual que (filas*columnas).",
        statusCode: HTTP_STATES.BAD_REQUEST
      }
    }
    
}

const validatePlayGameRequest =(body, game)=>{

  const {fila, columna, accion = "T"} = body

    if (!game)
    {
        throw {
            msg: "No hay ninguna partida de Buscaminas creada. Por favor, no olvide de crear la partida previamente.",
            statusCode: HTTP_STATES.EXPECTATION_FAILED
        }
    }

    if (!game.enCurso){
      throw {
        msg: "Tu partida ya ha finalizado! Si desea continuar jugando, por favor cree una nueva partida.",
        statusCode: HTTP_STATES.EXPECTATION_FAILED
      }
    }

    if (fila < 1 || fila > game.height){
      throw {
        msg: "Por favor, ingrese una fila válida. ",
        statusCode: HTTP_STATES.BAD_REQUEST
      }
    }

    if (columna < 1 || columna > game.width){
      throw {
        msg: "Por favor, ingrese una columna válida. ",
        statusCode: HTTP_STATES.BAD_REQUEST
      }
    }   

    if (!ACTIONS_ACCEPTED.includes(accion)){
      throw {
        msg: 'Por favor, ingrese una acción valida. T para destapar una celda, F para agregar una bandera, ? para agregar un signo de interrogación.',
        statusCode: HTTP_STATES.BAD_REQUEST
      }
    }


}


module.exports = {
    randomValue,
    validateCreateGameRequest,
    validatePlayGameRequest
}