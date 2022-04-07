const router = require('express').Router();
const apiRoutes = require('./api/index');
const homeRoutes = require('./home-routes')

// this declares the routes used in calls
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
