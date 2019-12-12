const { Router } = require('express');
const router = new Router();
const routeGuard = require('../../middleware/route-guard');

router.get('/:id', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({});
});

module.exports = router;
