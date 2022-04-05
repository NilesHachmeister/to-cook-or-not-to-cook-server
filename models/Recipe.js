const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {
    // constructor(id, name, ingredients, instrcuctions, favorite, created, user_id) {
    //     this.id = id,
    //         this.name = name,
    //         this.ingredients = ingredients,
    //         this.instructions = instrcuctions,
    //         this.favorite = favorite,
    //         this.created = created,
    //         this.user_id = user_id
    // }

    // getId() {
    //     return this.id;
    // };
    // getName() {
    //     return this.name;
    // };
    // getIngredients() {
    //     return this.ingredients;
    // }
    // getInstructions() {
    //     return this.instructions;
    // }
    // getFavorite() {
    //     return this.favorite;
    // }
    // getCreated() {
    //     return this.created;
    // }


    // functions go here? create the recipe? save it? 


}

// creating the recipe model
Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        instructions: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        created: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        human: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
);

module.exports = Recipe;
