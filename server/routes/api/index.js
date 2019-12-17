const { Router } = require('express');
const router = new Router();


router.use('/game', require('./game'));
router.use('/location', require('./location'));
router.use('/request', require('./request'));
router.use('/player', require('./player'));
router.use('/sport', require('./sport'));
router.use('/team', require('./team'));

module.exports = router;
