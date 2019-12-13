const { Router } = require('express');
const router = new Router();

const checkAuth = require("../../middleware/check-auth");


router.get('/:id', checkAuth, async (req, res, next) => {
  try {
    // const game = await Game.findById(req.params.id);
    res.status(200).json({teste: "OK"});
    // console.log(admin.auth());
  } catch (error) {
    next(error);
  }
});

module.exports = router;