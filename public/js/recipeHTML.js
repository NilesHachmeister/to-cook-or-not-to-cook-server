$(document).ready(function () {
    let currentRecipeNumber = 0;

    let savedRecipe = [];


    // this function creates an empty recipe card for the recipe.html page


    const createEmptyRecipe = async () => {

        const response = await fetch(`/api/recipe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        location.reload()
    }


    const saveRecipe = async (e) => {

        console.log(e);
        // this delares the saved recipe object that all recipes will be stored in. It also sets the created atrubite to true, indicating that the recipe wasn't only taken from the api
        let savedRecipeObj = {
            name: "",
            ingredients: "",
            instrcuctions: "",
            favorite: false,
            created: true,
            human: true
        }

        // console.log("ingredients", e.find($(".ingredients")));
        // console.log("directions", $(".directions"));
        // console.log("card-header-title", $(".card-header-title"));


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

    // This function checks 
    function findFavoriteRecipeID() {

        // this finds the data id of the clicked card
        let thisElement = $(this).parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
        let thisDataId = thisElement.attr("data-id")

        // this sends the data id to the add favorite function to give that chosen card the value of favorite
        addFavoriteToObject(thisDataId)
    }

    // this function takes the given ID and sets its corrosponding recipe object to favorite
    function addFavoriteToObject(thisDataId) {

        // This checks each recipe, if the ID matches it sets the favorite atribute to true
        for (let index = 0; index < savedRecipe.length; index++) {
            const element = savedRecipe[index].recipeNumber;
            if (element == thisDataId) {
                savedRecipe[index].favorite = true
            }
        }

        // this saves it into local storage
        localStorage.setItem("savedRecipe", JSON.stringify(savedRecipe));
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

    const removeRecipe = async () => {


        let thisElement = $(this).parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title");
        let id = thisElement.attr("data-id");



        const response = await fetch(`/api/posts/${id}`, {
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

    // $("#recipe-container").on("click", ".save-recipe", saveRecipe)
    $("#recipe-container").on("click", ".favorite-btn", findFavoriteRecipeID)
    $("#recipe-container").on("click", ".remove-recipe-btn", removeRecipe)
    $("#sort-by-favorite-btn").on("click", sortByFavorite)
    $("#sort-by-created-btn").on("click", sortByCreated)
    $(".create-new-recipe-btn").on("click", createEmptyRecipe)


    const deletePostBtn = document.querySelector('#delete-post-btn');

    const recipeContainer = $("#recipe-container")
    const saveRecipeBtn = $(".save-recipe")

    // if (saveRecipeBtn) {
    //     saveRecipeBtn.on('click', saveRecipe);
    // }
    saveRecipeBtn.on('click', function () {
        console.log($(this));
        saveRecipe($(this));
    })
}); 