const { Router } = require('express');
const router = new Router();
const routeGuard = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello World' } });
});


module.exports = router;
