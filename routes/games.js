const {Router} = require('express');
const { doPing, createGame, playGame, playGameId } = require('../controllers/games');

const router = Router();

router.get("/ping", doPing);

router.post("/", createGame);

router.post("/play", playGame);


router.post("/play/:id", playGameId);



module.exports = router;