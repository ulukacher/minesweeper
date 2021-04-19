const MINE_VALUE = 9;

const ACTIONS_GAME = {
  TAP: "T",
  QUESTION_MARK: "?",
  FLAG: "F"
}

const ACTIONS_ACCEPTED = ['T', 'F', '?'];

const STATES_GAME = {
  LOSE : "Game Over",
  WIN : "Juego resuelto",
  PENDING: "Juego en curso"
}

const HTTP_STATES = {
    BAD_REQUEST: 400,
    EXPECTATION_FAILED: 417,
    INTERNAL_SERVER_ERROR: 500
}

module.exports = {
    MINE_VALUE,
    ACTIONS_GAME,
    STATES_GAME,
    ACTIONS_ACCEPTED,
    HTTP_STATES
}