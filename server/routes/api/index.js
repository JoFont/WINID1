const { Router } = require('express');
const router = new Router();

const gameRouter = require('./game');
const locationRouter = require('./location');
const playerRouter = require('./player');
const sportRouter = require('./sport');
const teamRouter = require('./team');

router.use('/game', gameRouter);
router.use('/location', locationRouter);
router.use('/player', playerRouter);
router.use('/sport', sportRouter);
router.use('/team', teamRouter);

module.exports = router;
