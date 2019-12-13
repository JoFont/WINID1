const { Router } = require('express');
const router = new Router();
const checkAuth = require("../../middleware/check-auth");
const Sport = require("../../models/game");

router.get('/:id', checkAuth, async (req, res, next) => {
  try {
    const sport = await Sport.findById(req.params.id);
    res.status(200).json(sport);
  } catch (error) {
    next(error);
  }
});

router.post('/create', checkAuth, async (req, res, next) => {
  try {
    const body = req.body;
    const newSport = await Sport.create({...body});
    res.status(200).json(newSport);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', checkAuth, async (req, res, next) => {
  try {
    const body = req.body;
    const sport = await Sport.findByIdAndUpdate(req.params.id, {...body});
    res.status(200).json(sport);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkAuth, async (req, res, next) => {
  try {
    await Sport.deleteOne(req.params.id);
    res.status(200).json({message: `Sport with id: ${req.params.id} has been deleted!`});
  } catch (error) {
    next(error);
  }
});


module.exports = router;

