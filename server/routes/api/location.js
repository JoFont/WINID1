const { Router } = require('express');
const router = new Router();
const Location = require("../../models/location");
const checkAuth = require("../../middleware/check-auth");
 


// router.get('/:id', checkAuth, async (req, res, next) => {
//   try {
//     const sport = await Sport.findById(req.params.id).exec();
//     res.status(200).json(sport);
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/create', checkAuth, async (req, res, next) => {
  try {
    const body = req.body;
    const newLocation = await Location.create({...body});
    res.status(200).json(newLocation);
  } catch (error) {
    next(error);
  }
});

// router.patch('/:id/edit', checkAuth, async (req, res, next) => {
//   try {
//     const body = req.body;
//     const sport = await Sport.findByIdAndUpdate(req.params.id, {...body}).exec();
//     res.status(200).json(sport);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:id', checkAuth, async (req, res, next) => {
//   try {
//     await Sport.findByIdAndDelete(req.params.id).exec();
//     res.status(200).json({message: `Sport with id: ${req.params.id} has been deleted!`});
//   } catch (error) {
//     next(error);
//   }
// });


module.exports = router;

