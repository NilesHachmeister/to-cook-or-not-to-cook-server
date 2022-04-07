const router = require('express').Router();
const { User, Recipe } = require('../models');
const fetch = require('node-fetch');
const logginCheck = require('../utils/auth');
const res = require('express/lib/response');

// This gets everything for the homepage and renders it
router.get('/', async (req, res) => {


    try {

        // this checks to see if the currently logged in user has any intolerances or not
        let intolerantParams = "";
        if (req.session.loggedIn) {
            const findUserData = await User.findByPk(req.session.user_id);
            const user = findUserData.get({ plain: true });
            intolerantParams = user.intolerances
        }

        // if the intolerances come back as null then it is set to an empty string.
        if (intolerantParams == null) {
            intolerantParams = ""
        }

        // this is the link that will be called for spoonacular
        const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}`;

        // this is the object that will be sent for handlebars to load
        const googleMap = {
            link: `https://www.google.com/maps/embed/v1/search?key=${process.env.GOOGLE_API_KEY}&q=restaurants&zoom=14`
        }

        // this fetches the api url with the intolerance and search term included
        const spoonData = await fetch(spoonURL + intolerantParams)
            .then(function (response) {

                // this takes the response and turns it into json format
                return response.json();
            })
            .then(function (data) {
                const recipes = data.results

                // this renders the homepage with the recipes and goodle maps
                res.render('homepage', {
                    recipes, loggedIn: req.
                        session.loggedIn, googleMap
                });
            })

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this allows a user to search for a place or a recipe 
router.get('/search-item/:id', async (req, res) => {

    try {



        // this takes the searched term and stores it as a variable
        const searchItem = req.params.id

        // this searches googlemaps with the searched term
        const googleLink = `https://www.google.com/maps/embed/v1/search?key=${process.env.GOOGLE_API_KEY}&q=${searchItem}&zoom=14`
        let googleMap = {
            link: googleLink
        }

        // declaring the spoonacular api call base website
        const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}`;

        // this checks to see if the currently logged in user has any intolerances or not
        let intolerantParams = "";
        if (req.session.loggedIn) {
            const findUserData = await User.findByPk(req.session.user_id);
            const user = findUserData.get({ plain: true });
            intolerantParams = user.intolerances
        }

        // if the intolerances come back as null then it is set to an empty string.
        if (intolerantParams == null) {
            intolerantParams = ""
        }

        // this defines the search term used in the spoonacular api call
        const searchTerm = "&query=" + searchItem

        // this fetches the api url with the intolerance and search term included
        const spoonData = await fetch(spoonURL + intolerantParams + searchTerm)
            .then(function (response) {

                // this takes the response and turns it into json format
                return response.json();
            })
            .then(function (data) {

                // this renders the homepage with the recipes recieved as well as the map
                const recipes = data.results
                res.render('homepage', { recipes, loggedIn: req.session.loggedIn, googleMap });
            })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this gets all of the saved recipes for the recipe page
router.get('/recipe', logginCheck, async (req, res) => {

    // this finds all of the recipes that match the user_id of the currently logged in user
    const dbRecipeData = await Recipe.findAll({
        where: {
            user_id: req.session.user_id,
        },
    })

    // this gets the plain data from them
    const recipes = dbRecipeData.map((recipe) =>
        recipe.get({ plain: true }));

    // this renders the recipe page with the data recieved
    res.render('recipe', {
        recipes,
        loggedIn: req.session.loggedIn,
    });
});

// this gets all of the recipes that a user has and orders them by favorite
router.get('/recipe/sorted-by-favorite', logginCheck, async (req, res) => {

    try {
        // this finds all of the recipes that match the user_id of the currently logged in user and orders them by favorite 
        const dbRecipeData = await Recipe.findAll(
            {
                order: [
                    ['favorite', 'DESC'],
                ],
                where: {
                    user_id: req.session.user_id,
                },
            }
        )

        // this gets the plain data from them
        const recipes = dbRecipeData.map((recipe) =>
            recipe.get({ plain: true }));

        // this renders the recipe page with the data recieved
        res.render('recipe', {
            recipes,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/recipe/sorted-by-created', logginCheck, async (req, res) => {
    try {

        // this finds all of the recipes that match the user_id of the currently logged in user and orders them by if they were created or not
        const dbRecipeData = await Recipe.findAll(
            {
                order: [
                    ['created', 'DESC'],
                ],
                where: {
                    user_id: req.session.user_id,
                },
            }
        )

        // this gets the plain data from them
        const recipes = dbRecipeData.map((recipe) =>
            recipe.get({ plain: true }));

        // this renders the recipe page with the data recieved
        res.render('recipe', {
            recipes,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// this renders the login page for the user
router.get('/login', async (req, res) => {
    res.render('login');
});


module.exports = router;