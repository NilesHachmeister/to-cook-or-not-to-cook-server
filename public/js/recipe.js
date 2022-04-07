$(document).ready(function () {

    // declaring each button as a variable
    const saveRecipeBtn = $(".save-recipe")
    const removeRecipeBtn = $('.remove-recipe-btn')
    const favoriteBtn = $('.favorite-btn')
    const createNewRecipeBtn = $('.create-new-recipe-btn')
    const sortByCreatedBtn = $('#sort-by-created-btn')
    const sortByFavoriteBtn = $('#sort-by-favorite-btn')


    // this function creates an empty recipe card
    const createEmptyRecipe = async () => {

        // this sends a post to the server which creates a blank card, saves it to the user's recipes, and then reloads the page
        const response = await fetch(`/api/recipe/blank`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        location.reload()
    }

    // this updates a recipe already in the users database
    const saveRecipe = async (e) => {

        // this delares the saved recipe object that for the user's input to be stored in
        let savedRecipeObj = {
            name: "",
            ingredients: "",
            instructions: "",
        }

        // this finds the data id of the clicked card
        const thisElement = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
        const thisDataId = thisElement.attr("data-id")

        // this gets the recipe already stored in the database to check if it is favorited, created, or made for humans.
        const currentStatus = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        // this takes the data from the db and turns it into usable data
        let dataBackFromDb;
        await currentStatus.json().then(data => { dataBackFromDb = data });

        // this takes the data from the database and stores it in the object
        savedRecipeObj = {
            favorite: dataBackFromDb.favorite,
            created: dataBackFromDb.created,
            human: dataBackFromDb.human
        }

        // this gets the recipes name stores it in the object to be saved in the database
        const newRecipeNameBox = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title");
        savedRecipeObj.name = newRecipeNameBox.text()

        // this gets the recipes ingredients stores it in the object to be saved in the database
        const newRecipeIngredientsBox = e.parent(".btn-container").parent(".content").children(".ingredients").children(".text-input-for-recipe")
        savedRecipeObj.ingredients = newRecipeIngredientsBox.html()

        // this gets the recipes direction and stores it in the object to be saved in the database
        const newRecipeDirectionsBox = e.parent(".btn-container").parent(".content").children(".directions").children(".text-input-for-recipe")
        savedRecipeObj.instructions = newRecipeDirectionsBox.html()

        // this sends the recipe to the database to be saved
        const response = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'PUT',
            body: JSON.stringify(savedRecipeObj),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/recipe');
        }
    }

    // this function takes a recipe and toggles weather or not it is a favorite
    const addFavoriteToObject = async (e) => {

        // this finds the data id of the clicked card
        const thisElement = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
        const thisDataId = thisElement.attr("data-id")

        // this finds the recipe from the database to check if it is currently a favorite or not
        const currentStatus = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        // this takes the data from the db and turns it into usable data
        let dataBackFromDb;
        await currentStatus.json().then(data => { dataBackFromDb = data });

        // declaring the object that is going to be sent to the database
        let savedRecipeObj = {}

        // if the recipe is marked as a favorite it is then marked as false. If it is not a favorite, then it is marked as true
        if (dataBackFromDb.favorite == true) {
            savedRecipeObj = {
                favorite: false,
            }
        } else {
            savedRecipeObj = {
                favorite: true,
            }
        }

        // this sends the new recipe's favorite back to the database to be updated
        const response = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'PUT',
            body: JSON.stringify(savedRecipeObj),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/recipe');
        }
    }



    // this function removes a recipe
    const removeRecipe = async (e) => {

        // this finds the id of the recipe
        const thisElement = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title");
        const id = thisElement.attr("data-id");

        // this sends a delete request to the database to remove the specific recipe from the user's stored recipes
        const response = await fetch(`/api/recipe/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/recipe');
        }
    }

    // event listeners
    createNewRecipeBtn.on('click', createEmptyRecipe)
    $("#go-back-button").on("click", function () {
        document.location.replace('/');
    })
    sortByCreatedBtn.on('click', function () {
        document.location.replace('/recipe/sorted-by-created');
    })
    sortByFavoriteBtn.on('click', function () {
        document.location.replace('/recipe/sorted-by-favorite');
    })
    favoriteBtn.on('click', function () {
        addFavoriteToObject($(this))
    })
    removeRecipeBtn.on('click', function () {
        removeRecipe($(this))
    })
    saveRecipeBtn.on('click', function () {
        saveRecipe($(this));
    })
}); 