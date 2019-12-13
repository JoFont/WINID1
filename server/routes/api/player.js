const { Router } = require('express');
const router = new Router();
const Player = require('../../models/player');

const checkAuth = require('../../middleware/check-auth');

router.post('/findOrCreate', checkAuth, async (req, res, next) => {
  try {
    console.log('FIND OR CREATE');
    await Player.findOrCreate(req.authId, req.body.user);
    res.status(200).json({ teste: 'OK' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

/*
- [ ]  GET /:username
- [ ]  POST /create
- [ ]  PATCH /:id/edit
- [ ]  DELETE /:id
- [ ]  POST /:id/status
- [ ]  POST /:id/review
- [ ]  PATCH /:id/review/:review_id
*/
