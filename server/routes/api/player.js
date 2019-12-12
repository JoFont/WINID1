const { Router } = require('express');
const router = new Router();
const Player = require( "../../models/player");

const checkAuth = require("../../middleware/check-auth");


router.post('/create', checkAuth, async (req, res, next) => {
  try {
    // FIXME: Resolver granel na consola, não dá para fazer overwrite
    const player = await Player.create({
      
    });

    res.status(200).json({teste: "OK"});
    // console.log(admin.auth());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
