const router = require('express').Router();
const userRoute = require('./userRoute')
const recipeRoute = require('./recipeRoute')


// determins the route depending on the input
router.use('/users', userRoute);
router.use('/recipe', recipeRoute);


module.exports = router;
