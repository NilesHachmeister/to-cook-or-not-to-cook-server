$(document).ready(function () {

    const saveRecipeBtn = $(".save-recipe")
    const removeRecipeBtn = $('.remove-recipe-btn')
    const favoriteBtn = $('.favorite-btn')
    const createNewRecipeBtn = $('.create-new-recipe-btn')
    const sortByCreatedBtn = $('#sort-by-created-btn')
    const sortByFavoriteBtn = $('#sort-by-favorite-btn')


    // this function creates an empty recipe card for the recipe.html page


    const createEmptyRecipe = async () => {

        const response = await fetch(`/api/recipe/new`, {
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
            instructions: "",
        }


        // this finds the data id of the clicked card
        let thisElement = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
        let thisDataId = thisElement.attr("data-id")


        const currentStatus = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        let dataBack;
        await currentStatus.json().then(data => { dataBack = data });

        console.log(dataBack.favorite);

        savedRecipeObj = {
            favorite: dataBack.favorite,
            created: dataBack.created,
            human: dataBack.human
        }


        let newRecipeNameBox = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title");
        savedRecipeObj.name = newRecipeNameBox.text()

        // this gets the new recipes ingredients
        let newRecipeIngredientsBox = e.parent(".btn-container").parent(".content").children(".ingredients").children(".text-input-for-recipe")
        savedRecipeObj.ingredients = newRecipeIngredientsBox.html()


        // this gets the new recipes direction
        let newRecipeDirectionsBox = e.parent(".btn-container").parent(".content").children(".directions").children(".text-input-for-recipe")
        savedRecipeObj.instructions = newRecipeDirectionsBox.html()

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


    // this function takes the given ID and sets its corrosponding recipe object to favorite
    const addFavoriteToObject = async (e) => {

        // this finds the data id of the clicked card
        let thisElement = e.parent(".btn-container").parent(".content").parent(".card-content").parent(".card").children(".card-header").children(".card-header-title")
        let thisDataId = thisElement.attr("data-id")

        const currentStatus = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        let dataBack;
        await currentStatus.json().then(data => { dataBack = data });

        let savedRecipeObj = {}

        console.log(dataBack.favorite);
        if (dataBack.favorite == true) {
            savedRecipeObj = {

                favorite: false,
            }
        } else {
            savedRecipeObj = {
                favorite: true,
            }
        }

        const response = await fetch(`/api/recipe/${thisDataId}`, {
            method: 'PUT',
            body: JSON.stringify(savedRecipeObj),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/recipe');
        }
    }


    const sortByFavorite = async () => {

        document.location.replace('/recipe/sorted-by-favorite');

    }


    // this function sorts by checking if the recipe was created or not
    function sortByCreated() {

        document.location.replace('/recipe/sorted-by-created');

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
        document.location.replace('/');
    })

    // $("#sort-by-favorite-btn").on("click", sortByFavorite)
    // $("#sort-by-created-btn").on("click", sortByCreated)
    // $(".create-new-recipe-btn").on("click", createEmptyRecipe)




    createNewRecipeBtn.on('click', createEmptyRecipe)

    sortByCreatedBtn.on('click', sortByCreated)
    sortByFavoriteBtn.on('click', sortByFavorite)

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