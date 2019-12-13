const { Router } = require('express');
const router = new Router();
const Player = require('../../models/player');
const Status = require('../../models/status');
const Review = require('../../models/review');

const pushStatus = require('../../services/pushStatus');

const checkAuth = require('../../middleware/check-auth');

router.post('/findOrCreate', checkAuth, async (req, res, next) => {
  try {
    const player = await Player.findOrCreate(req.authId, req.body.user);
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
});

router.get('/:username', async (req, res, next) => {
  try {
    const player = await Player.findByUsername(req.params.username);
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/status', async (req, res, next) => {
  const id = req.params.id;
  pushStatus(id, Player, req.body.past, req.body.current);
  // try {
  //   const newStatus = await Status.create({
  //     current: req.body.current,
  //     past: ,
  //     on: id,
  //     onModel: 'Player'
  //   });
  //   const player = await Player.findById(id);
  //   player.statusLog.push(newStatus);
  //   player.status = newStatus;
  //   player.save();
  //   res.status(200);
  // } catch (error) {
  //   next(error);
  // }
});

module.exports = router;

/*
- [X]  GET /:username
- [X]  POST /create
- [ ]  PATCH /:id/edit
- [X]  DELETE /:id
- [ ]  POST /:id/status
- [ ]  POST /:id/review
- [ ]  PATCH /:id/review/:review_id
*/
