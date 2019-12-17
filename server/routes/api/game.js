const { Router } = require('express');
const router = new Router();
const checkAuth = require("../../middleware/check-auth");
const Game = require("../../models/game");
const addStatus = require("../../services/addStatus");

router.get('/:id', checkAuth, async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).exec();
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

router.post('/create', checkAuth, async (req, res, next) => {
  try {
    const data = req.body.data;
    const newGame = await Game.create({
      starters: { number: data.starters },
      subs: {number: data.subs},
      price: {
        value: data.price * 100
      },
      location: data.location._id,
      schedule: Date.parse(data.datePicker + "T" + data.timePicker),
    });
    newGame.admins.push(req.authId);
    newGame.save();
    // const statusLog = await addStatus(newGame._id, Game, {}, data.status.current);
    res.status(200).json({ newGame });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', checkAuth, async (req, res, next) => {
  try {
    const body = req.body;
    const game = await Game.findByIdAndUpdate(req.params.id, { ...body }).exec();
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkAuth, async (req, res, next) => {
  try {
    await Game.findByIdAndDelete(req.params.id).exec();
    res.status(200).json({ message: `Game with id: ${req.params.id} has been deleted!` });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/status', checkAuth, async (req, res, next) => {
  try {
    const statusLog = await addStatus(req.params.id, Game, req.body.past, req.body.current);
    res.status(200).json(statusLog);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
