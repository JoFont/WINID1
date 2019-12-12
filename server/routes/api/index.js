const { Router } = require('express');
const router = new Router();
const gameRouter = require('./game');
const playerRouter = require('./player');



router.use('/game', gameRouter);
router.use('/player', playerRouter);


module.exports = router;
