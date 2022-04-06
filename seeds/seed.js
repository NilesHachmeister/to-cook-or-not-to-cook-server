const sequelize = require('../config/connection');
const { User, Recipe } = require('../models');
const userSeed = require('./userSeed.json');
const recipeSeed = require('./recipeSeed.json')

// this seeds the database with example data
const seedExamples = async () => {

    await sequelize.sync({ force: true });

    await User.bulkCreate(userSeed);

    await Recipe.bulkCreate(recipeSeed);

    process.exit(0);
};

// runs the seed
seedExamples();