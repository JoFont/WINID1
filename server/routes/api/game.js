const { Router } = require("express");
const router = new Router();
const checkAuth = require("../../middleware/check-auth");
const Game = require("../../models/game");
const Request = require("../../models/request");
const addStatus = require("../../services/addStatus");

router.get("/:id", checkAuth, async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate("location")
      .populate("players")
      .populate("starters")
      .populate("subs")
      .populate("queue")
      .populate("sport")
      .populate("admins")
      .populate("requestRef")
      .exec();
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

router.post("/create", checkAuth, async (req, res, next) => {
  try {
    const data = req.body.data;
    const newGame = await Game.createAndPush(data, data.playerId);
    // const statusLog = await addStatus(newGame._id, Game, {}, data.status ? data.status.current : "Draft");
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

router.post("/:id/addPlayerToPlayers", checkAuth, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await Game.addPlayerToPlayers(req.params.id, data.playerId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/edit", checkAuth, async (req, res, next) => {
  try {
    const data = req.body.data;
    const game = await Game.findByIdAndUpdate(req.params.id, { ...data }).exec();
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/delete", checkAuth, async (req, res, next) => {
  try {
    const data = req.body.data;
    if (data.game.admins.includes(data.player._id)) {
      await Game.findByIdAndDelete(req.params.id).exec();
      await data.firebase
        .firestore()
        .collection("chatGroups")
        .doc(data.game.chatRef)
        .delete();
      if (data.game.requestRef) await Request.findByIdAndDelete(data.game.requestRef).exec();

      res.status(200).json({ deleted: true });
    } else {
      res.status(401).json({ message: `User is not an Admin and cannot delete game ${req.params.id}` });
    }
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
    const games = await Game.find()
      .populate("location")
      .populate("players")
      .populate("admins")
      .exec();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
