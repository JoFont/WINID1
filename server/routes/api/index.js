const { Router } = require('express');
const router = new Router();

const gameRouter = require('./game');

router.use('/game', gameRouter);
router.use('/location', require('./location'));
router.use('/player', require('./player'));
router.use('/sport', require('./sport'));
router.use('/team', require('./team'));


module.exports = router;
