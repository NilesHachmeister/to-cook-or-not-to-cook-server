const router = require('express').Router();
const { User, Recipe } = require('../models');
const fetch = require('node-fetch');
const logginCheck = require('../utils/auth');
const res = require('express/lib/response');

router.get('/', async (req, res) => {

    // // this finds all of the posts that are in the database and populates the homepage with them
    try {

        let intolerantParams = "";

        if (req.session.loggedIn) {
            const findUserData = await User.findByPk(req.session.user_id);
            const user = findUserData.get({ plain: true });
            intolerantParams = user.intolerances
            console.log("---------------");
        }

        console.log(intolerantParams);

        let googleLink = `https://www.google.com/maps/embed/v1/search?key=${process.env.GOOGLE_API_KEY}&q=restaurants&zoom=14`

        const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}`;

        let googleMap = {
            link: googleLink
        }
        if (intolerantParams == null) {
            intolerantParams = ""
        }

        // this fetches the api url with the intolerance and search term included
        const spoonData = await fetch(spoonURL + intolerantParams)
            .then(function (response) {

                // this takes the response and turns it into json format
                return response.json();
            })
            .then(function (data) {
                const recipes = data.results

                console.log(recipes);
                res.render('homepage', {
                    recipes, loggedIn: req.
                        session.loggedIn, googleMap
                });
            })


    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.get('/recipe', logginCheck, async (req, res) => {

    const dbRecipeData = await Recipe.findAll({
        where: {
            user_id: req.session.user_id,
        },
    })



    const recipes = dbRecipeData.map((recipe) =>
        recipe.get({ plain: true }));


    res.render('recipe', {
        recipes,
        loggedIn: req.session.loggedIn,
    });

});

router.get('/recipe/sorted-by-favorite', logginCheck, async (req, res) => {
    try {
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
        const recipes = dbRecipeData.map((recipe) =>
            recipe.get({ plain: true }));


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
        const recipes = dbRecipeData.map((recipe) =>
            recipe.get({ plain: true }));

        res.render('recipe', {
            recipes,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/search-item/:id', async (req, res) => {

    try {
        const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}`;
        const intolerantParams = "";
        const searchItem = req.params.id
        const searchTerm = "&query=" + searchItem

        let googleLink = `https://www.google.com/maps/embed/v1/search?key=${process.env.GOOGLE_API_KEY}&q=${searchItem}&zoom=14`
        let googleMap = {
            link: googleLink
        }


        // this fetches the api url with the intolerance and search term included
        const spoonData = await fetch(spoonURL + intolerantParams + searchTerm)
            .then(function (response) {

                // this takes the response and turns it into json format
                return response.json();
            })
            .then(function (data) {
                const recipes = data.results
                res.render('homepage', { recipes, loggedIn: req.session.loggedIn, googleMap });
            })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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