const { Router } = require('express');
const router = new Router();
const Player = require('../../models/player');

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

module.exports = router;

/*
- [ ]  GET /:username
- [X]  POST /create
- [ ]  PATCH /:id/edit
- [ ]  DELETE /:id
- [ ]  POST /:id/status
- [ ]  POST /:id/review
- [ ]  PATCH /:id/review/:review_id
*/
