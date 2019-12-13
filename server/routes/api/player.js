const { Router } = require('express');
const router = new Router();
const Player = require('../../models/player');
const Review = require('../../models/review');

const pushStatus = require('../../services/pushStatus');
const pushReview = require('../../services/pushReview');

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

router.delete('/:id', checkAuth, async (req, res, next) => {
  try {
    await Player.findByIdAndDelete(req.params.id).exec();
    res.status(200);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', checkAuth, async (req, res, next) => {
  try {
    await Player.findByIdAndUpdate(req.params.id, {
      ...username && username,
      ...displayName && displayName,
      ...email && email,
      ...photoUrl && photoUrl,
      ...sports && sports,
      ...range && range
    }).exec();
    res.status(200);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/status', checkAuth, async (req, res, next) => {
  const id = req.params.id;
  try {
    const statusLog = await pushStatus(
      id,
      Player,
      req.body.past,
      req.body.current
    );
    res.status(200).json(statusLog);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/:id/review', checkAuth, async (req, res, next) => {
  const id = req.params.id;
  try {
    const review = await pushReview(id, Player, req.authId, req.body);
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;

// - [X]  GET /:username
// - [X]  POST /create
// - [X]  PATCH /:id/edit
// - [X]  DELETE /:id
// - [X]  POST /:id/status
// - [X]  POST /:id/review
// - [ ]  PATCH /:id/review/:review_id
