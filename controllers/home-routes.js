const router = require('express').Router();
const { User, recipe } = require('../models');


router.get('/', async (req, res) => {
    res.render('homepage');
});


router.get('/recipe', async (req, res) => {
    res.render('recipe');
});

module.exports = router;