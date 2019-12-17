const { Router } = require("express");
const router = new Router();
const checkAuth = require("../../middleware/check-auth");
const Game = require("../../models/game");
const addStatus = require("../../services/addStatus");

router.get("/:id", checkAuth, async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id).exec();
    game.populate("location");
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});


router.post("/create", checkAuth, async (req, res, next) => {
  try {
    const data = req.body.data;
    const newGame = await Game.createAndPush(data, data.player);
    // const statusLog = await addStatus(newGame._id, Game, {}, data.status.current);
    res.status(200).json({ newGame });
  } catch (error) {
    next(error);
  }
});

// router.post("/rage", checkAuth, async (req, res, next) => {
//   try {
//     const range = req.body.data.range;
//     const newGame = await Game.find({
//       location: {
//        $near: {
//         $maxDistance: range,
//         $geometry: {
//          type: "Point",
//          coordinates: [long, latt]
//         }
//        }
//       }
//      }).find((error, results) => {
//       if (error) console.log(error);
//       console.log(JSON.stringify(results, 0, 2));
//      });;
//     // const statusLog = await addStatus(newGame._id, Game, {}, data.status.current);
//     res.status(200).json({ newGame });
//   } catch (error) {
//     next(error);
//   }
// });

router.patch("/:id/edit", checkAuth, async (req, res, next) => {
  try {
    const data = req.body.data;
    const game = await Game.findByIdAndUpdate(req.params.id, { ...data }).exec();
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", checkAuth, async (req, res, next) => {
  try {
    await Game.findByIdAndDelete(req.params.id).exec();
    res.status(200).json({ message: `Game with id: ${req.params.id} has been deleted!` });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/status", checkAuth, async (req, res, next) => {
  try {
    const statusLog = await addStatus(req.params.id, Game, req.body.past, req.body.current);
    res.status(200).json(statusLog);
  } catch (error) {
    next(error);
  }
});


router.get("/", async (req, res, next) => {
  try {
    // FIXME: Populate players não trabalha porque não sãpo object id, mudar auth para object id
    const games = await Game.find().populate("location").exec();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
