const {Router} = require('express');
const { doPing, createGame, playGame } = require('../controllers/games');

const router = Router();

router.get("/ping", doPing);

router.post("/", createGame);

router.post("/play/:id", playGame);



module.exports = router;