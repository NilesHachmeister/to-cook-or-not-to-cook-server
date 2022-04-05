const router = require('express').Router();
const { User, Recipe } = require('../models');
const fetch = require('node-fetch');

router.get('/', async (req, res) => {

    // // this finds all of the posts that are in the database and populates the homepage with them
    // try {

    const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}`;
    const intolerantParams = "";
    const searchTerm = "";


    // this fetches the api url with the intolerance and search term included
    const spoonData = await fetch(spoonURL + intolerantParams + searchTerm)
        .then(function (response) {

            // this takes the response and turns it into json format
            return response.json();
        })
        .then(function (data) {
            const recipes = data.results
            res.render('homepage', { recipes, loggedIn: req.session.loggedIn });
        })
});


router.get('/recipe', async (req, res) => {

    const dbRecipeData = await Recipe.findAll()
    const recipes = dbRecipeData.map((recipe) =>
        recipe.get({ plain: true }));



    res.render('recipe', {
        recipes,
        loggedIn: req.session.loggedIn,
    });

});


// this renders the login page for the user
router.get('/login', async (req, res) => {
    res.render('login');
});

// this renders the signup page for the user
router.get('/signup', async (req, res) => {
    res.render('signup');
});

module.exports = router;