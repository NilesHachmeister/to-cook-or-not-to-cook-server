const router = require('express').Router();
const { Recipe, User } = require('../../models');
const fetch = require('node-fetch');
const logginCheck = require('../../utils/auth')

// route is /api/recipe/

// this finds a recipe by id and returns it to the user as json.
router.get('/:id', async (req, res) => {

    // this finds the recipe by id
    try {
        const singleRecipeData = await Recipe.findByPk(req.params.id, {
            include: [{ model: User }]
        });

        // taking the data and sending it back to the user as json.
        const recipe = singleRecipeData.get({ plain: true });
        res.json(recipe);

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this creates a new recipe based on the information sent in through the req.body
router.post('/new', logginCheck, async (req, res) => {

    // this creates a recipe based on what is in the req.body. The user_id is based on the logged in users id.
    try {
        const recipeData = await Recipe.create({
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            favorite: req.body.favorite,
            created: req.body.created,
            human: req.body.human,
            user_id: req.session.user_id
        });

        res.status(200).json(recipeData);
        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }

});

// this creates a blank recipe when the user clicks create new recipe.
router.post('/blank', logginCheck, async (req, res) => {

    // the recipe is filled with default values
    try {
        const recipeData = await Recipe.create({
            name: "Recipe Name",
            ingredients: "Recipe Ingredients",
            instructions: "Recipe Instructions",
            favorite: false,
            created: true,
            human: true,
            user_id: req.session.user_id
        });

        res.status(200).json(recipeData);
        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


// this changes a recipe based on its id
router.put('/:id', logginCheck, async (req, res) => {

    // it updates the recipe based on everything in the req.body where the recipe id matches the id sent in via the params.
    try {
        const recipeData = await Recipe.update(
            {
                name: req.body.name,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                favorite: req.body.favorite,
                created: req.body.created,
                human: req.body.human
            },
            {
                where: {
                    id: req.params.id,
                },
            });

        res.status(200).json(recipeData)

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this deletes a recipe by its id
router.delete('/:id', logginCheck, async (req, res) => {

    try {
        const recipeData = await Recipe.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json(recipeData);

        // catches any errors
    } catch (err) {
        res.status(500).json(err);
    }
});


// this fetches detailed information on a specific recipe. Once the user saved a recipe from the home page, this calls spoonacular to get the instructions and ingredients for the user to save to their recipe book.
router.get('/spoon/:id', async (req, res) => {

    // declaring spoonURL which is used to call the api with the recipe id and our api key
    const spoonURL = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;

    // call the api
    const spoonData = await fetch(spoonURL)
        .then(function (response) {

            // gets the response and puts it in json format
            return response.json();
        })
        .then(function (data) {
            // returns that data to the front end
            const recipes = data
            res.json(recipes);
        })
});

module.exports = router;