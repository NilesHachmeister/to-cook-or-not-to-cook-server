const router = require('express').Router();
const { Recipe, User } = require('../../models');
const { render } = require('../../server');
const fetch = require('node-fetch');


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


        res.status(200).json(recipe);


        // res.render('single-post', { post, loggedIn: req.session.loggedIn, },);

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


});



router.post('/new', async (req, res) => {

    try {
        const recipeData = await Recipe.create({
            name: req.body.name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            favorite: false,
            created: false,
            human: true
        });


        const recipe = recipeData.dataValues

        res.render('recipe')

        // catches any errors
    } catch (err) {
        res.status(400).json(err);
    }

});



router.put('/:id', async (req, res) => {
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


        res.status(200).json(recipeData);

        // catches any errors
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {

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


router.get('/sortByFavorite', async (req, res) => {


    console.log("here---------------");
    // try {
    //     const dbRecipeData = await Recipe.findAll(

    //         {
    //             order: [
    //                 ['favorite', 'DESC'],
    //                 ['id', 'ASC'],
    //             ],
    //         }

    //     )
    //     const recipes = dbRecipeData.map((recipe) =>
    //         recipe.get({ plain: true }));

    //     res.render('/recipes', recipes)
    //     res.status(200).json(recipes);
    //     // catches any errors
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json(err);
    // }

});



router.post('/', async (req, res) => {

    console.log(loggedIn);

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

    // const spoonURL = `https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;

    // // this fetches the api url with the intolerance and search term included
    // const spoonData = await fetch(spoonURL)
    //     .then(function (response) {


    //         return response.json();
    //     })
    //     .then(function (data) {
    //         const recipes = data
    //         console.log(recipes);
    //     })
    console.log("here-----------------");

    res.send("this")

});





module.exports = router;