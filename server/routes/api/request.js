const { Router } = require("express");
const router = new Router();
const Request = require("../../models/request");

const checkAuth = require("../../middleware/check-auth");

router.post("/create", checkAuth, async (req, res, next) => {
  try {
    const data = req.body.data;
    const newRequest = await Request.createAndPushAdmins(data);
    res.status(200).json(newRequest);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const requests = await Request.find()
      .populate({
        path: "game",
        model: "Game",
        populate: {
          path: "location",
          model: "Location"
        }
      })
      .populate("admins")
      .exec();
    res.status(200).json(requests);
  } catch (error) {
    next(error);
  }
});

// router.get('/:username', async (req, res, next) => {
//   try {
//     const player = await Player.findByUsername(req.params.username);
//     res.status(200).json(player);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete('/:id', checkAuth, async (req, res, next) => {
//   try {
//     await Player.findByIdAndDelete(req.params.id).exec();
//     res.status(200);
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch('/:id/edit', checkAuth, async (req, res, next) => {
//   try {
//     await Player.findByIdAndUpdate(req.params.id, {
//       ...username && username,
//       ...displayName && displayName,
//       ...email && email,
//       ...photoUrl && photoUrl,
//       ...sports && sports,
//       ...range && range
//     }).exec();
//     res.status(200);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/:id/status', checkAuth, async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const statusLog = await addStatus(
//       id,
//       Player,
//       req.body.past,
//       req.body.current
//     );
//     res.status(200).json(statusLog);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/:id/review', checkAuth, async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const review = await addReview(id, Player, req.authId, req.body);
//     res.status(200).json(review);
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch('/:id/review', checkAuth, async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const review = await addReview(id, Player, req.authId, req.body);
//     res.status(200).json(review);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
