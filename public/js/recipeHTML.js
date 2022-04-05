$(document).ready(function () {

    const saveRecipeBtn = $(".save-recipe")
    const removeRecipeBtn = $('.remove-recipe-btn')
    const favoriteBtn = $('.favorite-btn')
    const createNewRecipeBtn = $('.create-new-recipe-btn')
    const sortByCreatedBtn = $('#sort-by-created-btn')
    const sortByFavoriteBtn = $('#sort-by-favorite-btn')


    // this function creates an empty recipe card for the recipe.html page


    const createEmptyRecipe = async () => {

        const response = await fetch(`/api/recipe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        location.reload()
    }


    const saveRecipe = async (e) => {

        // this delares the saved recipe object that all recipes will be stored in. It also sets the created atrubite to true, indicating that the recipe wasn't only taken from the api
        let savedRecipeObj = {
            name: "",
            ingredients: "",
            instrcuctions: "",
            created: true,
            human: true
        }



        let newRecipeNameBox = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title");

        console.log(newRecipeNameBox);
        savedRecipeObj.name = newRecipeNameBox.text()

        // this gets the new recipes ingredients
        let newRecipeIngredientsBox = e.parent(".btn-container").parent(".content").children(".ingredients").children(".text-input-for-recipe")
        savedRecipeObj.ingredients = newRecipeIngredientsBox.html()


        // this gets the new recipes direction
        let newRecipeDirectionsBox = e.parent(".btn-container").parent(".content").children(".directions").children(".text-input-for-recipe")
        savedRecipeObj.instrcuctions = newRecipeDirectionsBox.html()

        // this grabs the data id attribute of the selected  recipe
        let thisDataId = newRecipeNameBox.attr("data-id")

        const response = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'PUT',
            body: JSON.stringify(savedRecipeObj),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/recipe');
        }
    }


    // this function takes the given ID and sets its corrosponding recipe object to favorite
    const addFavoriteToObject = async (e) => {

        // this finds the data id of the clicked card
        let thisElement = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
        let thisDataId = thisElement.attr("data-id")

        let savedRecipeObj = {
            favorite: true,
        }

        console.log("here");

        console.log(savedRecipeObj);

        const response = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'PUT',
            body: JSON.stringify(savedRecipeObj),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/recipe');
        }


    }


    // this sorts the recipes depending on if they are marked as a favorite or not

    const sortByFavorite = async () => {


        console.log("here");


        const response = await fetch('/api/recipe/sortByFavorite');

    }


    // this function sorts by checking if the recipe was created or not
    function sortByCreated() {




        // // this declares variables
        // let countLength = savedRecipe.length
        // let createdArray = []
        // let notCreatedArray = []

        // // this runns through each recipe and checks if they are marked as created or not. If they are a created recipe they are moved into the created array, else they are moved into the notCreatedArray
        // for (let index = 0; index < countLength; index++) {
        //     const element = savedRecipe[0].created;
        //     if (element) {
        //         let removed = (savedRecipe.splice(0, 1))
        //         $.merge(createdArray, removed)
        //     } else {
        //         let removed = (savedRecipe.splice(0, 1))
        //         console.log(removed);
        //         $.merge(notCreatedArray, removed)
        //     }

        // }

        // // this merges the created and notCreated arrays and saves them as savedRecipes
        // savedRecipe = $.merge(createdArray, notCreatedArray)

        // // this puts the saved recipes into local storage
        // localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));

        // // this reloads the page so that the recipes are displayed in the new order
        // location.reload()
    }


    // this function removes a recipe
    const removeRecipe = async (e) => {

        let thisElement = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title");
        let id = thisElement.attr("data-id");

        const response = await fetch(`/api/recipe/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/recipe');
        }
    }



    // this takes the user to the index page
    $("#go-back-button").on("click", function () {
        console.log("here");

        document.location.replace('./index.html');
    })

    // $("#sort-by-favorite-btn").on("click", sortByFavorite)
    // $("#sort-by-created-btn").on("click", sortByCreated)
    // $(".create-new-recipe-btn").on("click", createEmptyRecipe)




    createNewRecipeBtn.on('click', createEmptyRecipe)

    sortByCreatedBtn.on('click', function () {
        sortByCreated
    })
    sortByFavoriteBtn.on('click', function () {
        sortByFavorite
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