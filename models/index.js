const User = require('./User');
const Recipe = require('./Recipe');

// this file determines the relationship between each model

// demonstrating the relationship between users and recipes
User.hasMany(Recipe, {
    foreignKey: 'user_id',
});
Recipe.belongsTo(User, {
    foreignKey: 'user_id',
});


module.exports = { User, Recipe };