const { Router } = require('express');
const router = new Router();
const checkAuth = require("../../middleware/check-auth");
const Team = require("../../models/team");

router.get('/:id', checkAuth, async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
});

router.post('/create', checkAuth, async (req, res, next) => {
  try {
    const body = req.body;
    const newTeam = await Team.create({...body});
    res.status(200).json(newTeam);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/edit', checkAuth, async (req, res, next) => {
  try {
    const body = req.body;
    const team = await Team.findByIdAndUpdate(req.params.id, {...body});
    res.status(200).json(team);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkAuth, async (req, res, next) => {
  try {
    await team.deleteOne(req.params.id);
    res.status(200).json({message: `Team with id: ${req.params.id} has been deleted!`});
  } catch (error) {
    next(error);
  }
});


module.exports = router;

