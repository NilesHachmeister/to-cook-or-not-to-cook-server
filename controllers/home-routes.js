const router = require('express').Router();
const { User, recipe } = require('../models');


router.get('/', async (req, res) => {

    // // this finds all of the posts that are in the database and populates the homepage with them
    // try {

    //     const spoonURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}`;
    //     const intolerantParams = "";
    //     const searchTerm = "";


    //     // this fetches the api url with the intolerance and search term included
    //     const spoonData = await fetch(spoonURL + intolerantParams + searchTerm)
    //         .then(function (response) {

    //             // this takes the response and turns it into json format
    //             return response.json();
    //         })
    //         .then(function (data) {

    //             console.log(data);

    //         })

    //     // const dbPostData = await Post.findAll({ include: { model: User } }, { plain: true })
    //     // const posts = dbPostData.map((post) =>
    //     //     post.get({ plain: true }));

    //     // res.render('homepage', {
    //     //     posts,
    //     //     loggedIn: req.session.loggedIn,
    //     // });
    //     console.log(spoonData);


    res.render('homepage');
}
);


router.get('/recipe', async (req, res) => {
    res.render('recipe');
});

module.exports = router;