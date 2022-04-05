const router = require('express').Router();
const { Recipe, User } = require('../../models');
const { render } = require('../../server');
const fetch = require('node-fetch');
const logginCheck = require('../../utils/auth')


// add middlewear for checking if the user is logged in

// route is /api/recipe/


router.get('/', async (req, res) => {

    try {
        const dbRecipeData = await Recipe.findAll({ include: { model: User } }, { plain: true })
        const recipes = dbRecipeData.map((recipe) =>
            recipe.get({ plain: true }));

        res.render('homepage', {
        });
        res.status(200).json(recipes);
        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});

router.get('/:id', async (req, res) => {

    try {
        const singleRecipeData = await Recipe.findByPk(req.params.id, {
            include: [{ model: User }]
        });
        const recipe = singleRecipeData.get({ plain: true });
        res.json(recipe);



        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


});



router.post('/new', logginCheck, async (req, res) => {

    try {
        const recipeData = await Recipe.create({
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            favorite: req.body.favorite,
            created: req.body.created,
            human: req.body.human
        });


        // catches any errors
    } catch (err) {

        res.status(400).json(err);
    }

});



router.put('/:id', logginCheck, async (req, res) => {

    console.log(req.body);

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

        console.log(recipeData);
        res.status(200).json(recipeData)



        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


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






router.post('/', logginCheck, async (req, res) => {

    try {
        const recipeData = await Recipe.create({
            name: "Recipe Name",
            ingredients: "Recipe Ingredients",
            instructions: "Recipe Dircetions",
            favorite: false,
            created: true,
            human: true
        });


        const recipe = recipeData.dataValues

        res.render('recipe')

        // catches any errors
    } catch (err) {
        res.status(400).json(err);
    }

});

router.get('/spoon/:id', async (req, res) => {

    const spoonURL = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;

    // this fetches the api url with the intolerance and search term included
    const spoonData = await fetch(spoonURL)
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {
            const recipes = data
            res.json(recipes);
        })


});





module.exports = router;