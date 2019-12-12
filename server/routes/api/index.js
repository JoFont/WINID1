const { Router } = require('express');
const router = new Router();
const gameRouter = require('./game');

router.use('/game', gameRouter);
