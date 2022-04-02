const router = require('express').Router();
const { User, recipe } = require('../models');


router.get('/', async (req, res) => {
    res.render('homepage');
});

module.exports = router;