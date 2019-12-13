const { Router } = require('express');
const router = new Router();
const checkAuth = require("../../middleware/check-auth");
const Game = require("../../models/game");
const pushStatus = require("../../services/pushStatus");

router.get('/:id', checkAuth, async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

router.post('/create', checkAuth, async (req, res, next) => {
  try {
    const body = req.body;
    const newGame = await Game.create({...body});
    res.status(200).json(newGame);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', checkAuth, async (req, res, next) => {
  try {
    const body = req.body;
    const game = await Game.findByIdAndUpdate(req.params.id, {...body});
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkAuth, async (req, res, next) => {
  try {
    await Game.deleteOne(req.params.id);
    res.status(200).json({message: `Game with id: ${req.params.id} has been deleted!`});
  } catch (error) {
    next(error);
  }
});

router.post('/:id/status', checkAuth, async (req, res, next) => {
  try {
    const statusLog = await pushStatus(req.params.id, Game, req.body.past, req.body.current);
    res.status(200).json(statusLog);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
