const { Router } = require('express');
const router = new Router();
const Player = require('../../models/player');
const Review = require('../../models/review');

const addStatus = require('../../services/addStatus');
const addReview = require('../../services/addReview');

const checkAuth = require('../../middleware/check-auth');

router.post('/findOrCreate', checkAuth, async (req, res, next) => {
  try {
    const player = await Player.findOrCreate(req.authId, req.body.user);
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
});

router.post('/searchByUsername', checkAuth, async (req, res, next) => {
  try {
    const response = await Player.searchByUsername(req.body.query);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.post('/searchByDisplayName', checkAuth, async (req, res, next) => {
  try {
    const response = await Player.searchByDisplayName(req.body.query);
    res.status(200).json(response);
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
    const statusLog = await addStatus(
      id,
      Player,
      req.body.past,
      req.body.current
    );
    res.status(200).json(statusLog);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/review', checkAuth, async (req, res, next) => {
  const id = req.params.id;
  try {
    const review = await addReview(id, Player, req.authId, req.body);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/review', checkAuth, async (req, res, next) => {
  const id = req.params.id;
  try {
    const review = await addReview(id, Player, req.authId, req.body);
    res.status(200).json(review);
  } catch (error) {
    next(error);
  }
});


// TODO: Finish with static
router.get("/:username/chatList", checkAuth, async (req, res, next) => {
  const id = req.params.id;
  try {
    const player = await Player.findByUsername(req.params.username).populate("teams").populate("games").populate("leagues");
    
  } catch (error) {
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
