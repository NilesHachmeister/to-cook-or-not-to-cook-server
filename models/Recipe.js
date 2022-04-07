const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model { }

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
