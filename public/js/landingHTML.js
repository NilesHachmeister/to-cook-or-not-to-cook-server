


// declaring variables
let modalBtn = $("#modal-btn")
let intolerantParams = "";
let intolerantArray = [];
let searchTerm = ""
// let spoonacularAPIKey = process.env.SPOONACULAR_API_KEY;
let spoonacularAPIKey = "";
let googleAPIKey = ""
let spoonURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularAPIKey}`;
let googleURL = `https://www.google.com/maps/embed/v1/search?key=${googleAPIKey}&q=restaurantst&zoom=14`


let recipeIDArray = [];
let recipeID = 0;


const saveRecipeToDbBtn = $('.save-recipe-to-db')


// // this is in both?
// let savedRecipe = [];



function init() {
    //  this gets all of the stored intolerant items
    // getStoredIntolerants()

    // this compiles all of the current intolerances
    // compileParams()

    // this calls the api to get the map
    // getMap()


}



// this function gets the maps and puts it in the map holder on the index.html page
// function getMap() {

//     // this creates a variable that is the html for the google map
//     googleMap = '<figure class = "image"><iframe width="100%" height="250" frameborder="0" style="border:0" src="' + googleURL + '" allowfullscreen></iframe></figure>'

//     // this puts the html variable into the html into the map holder
//     $("#map-holder").html(googleMap);
// }



// this function allows the user to search for places 
function searchGoogleMaps() {

    // this defines the search term
    let userSearchTerm = $("#google-search-bar").val()

    // this enbeds the search term in the api call
    let userGoogleSearch = `https://www.google.com/maps/embed/v1/search?key=${googleAPIKey}&q=${userSearchTerm}t&zoom=14`

    // this creates a variable that is the html for the google map with the the search term included
    let userGoogleMap = '<figure class = "image"><iframe width="100%" height="250" frameborder="0" style="border:0" src="' + userGoogleSearch + '" allowfullscreen></iframe></figure>'

    // this puts the html variable into the html into the map holder
    $("#map-holder").html(userGoogleMap);
}


// this calls the api by id inorder to get detailed infforamion on the recipe
function callAPIByID() {


}


// this function checks the values of all of the intolerances the user enters. It also starts a cascading series of events to recreate the cards on the index.html page given the new values.
function saveInts() {

    // this clears local storage and the old array before adding what we currently want to save

    // this checks each checkbox, if they are checked the value is pushed into the array
    console.log("save button clicked");
    if ($('#intolerance1').is(':checked')) {
        intolerantArray.push("dairy");
    }
    if ($('#intolerance2').is(':checked')) {
        intolerantArray.push("egg");
    }
    if ($('#intolerance3').is(':checked')) {
        intolerantArray.push("gluten");
    }
    if ($('#intolerance4').is(':checked')) {
        intolerantArray.push("grain");
    }
    if ($('#intolerance5').is(':checked')) {
        intolerantArray.push("peanut");
    }
    if ($('#intolerance6').is(':checked')) {
        intolerantArray.push("seafood");
    }
    if ($('#intolerance7').is(':checked')) {
        intolerantArray.push("sesame");
    }
    if ($('#intolerance8').is(':checked')) {
        intolerantArray.push("shellfish");
    }
    if ($('#intolerance9').is(':checked')) {
        intolerantArray.push("soy");
    }
    if ($('#intolerance10').is(':checked')) {
        intolerantArray.push("sulfite");
    }
    if ($('#intolerance11').is(':checked')) {
        intolerantArray.push("treenut");
    }
    if ($('#intolerance12').is(':checked')) {
        intolerantArray.push("wheat");
    }


    // this takes everything in the array and saves it in local storage
    localStorage.setItem("intolerantArray", JSON.stringify(intolerantArray));

    // this function checks local storage to make sure that all of the variables are up to date
    getStoredIntolerants()

    // this funcion compiles all of the intolerances into a parametor
    compileParams()

    // this function takes aa search term (if there is one), and applies that to api call, then calls the api
    addSearchTerm()
}


// this function is designed to check everything in local storage and set the variables to them
function getStoredIntolerants() {

    // this gets all of the stored recipes if there are any saved in storage
    if (JSON.parse(localStorage.getItem("savedRecipe")) !== null) {
        savedRecipe = JSON.parse(localStorage.getItem("savedRecipe"))
    }

    // this checks to make sure that there are intolerant times in local storage
    if ((JSON.parse(localStorage.getItem("intolerantArray"))) !== null) {

        // if there are items they ore put into an array
        intolerantArray = (JSON.parse(localStorage.getItem("intolerantArray")));

        // this checks if the items are in the array. if they are the boxes are then checked
        if (intolerantArray.includes("dairy")) {
            $("#intolerance1").prop("checked", true);
        }
        if (intolerantArray.includes("egg")) {
            $("#intolerance2").prop("checked", true);
        }
        if (intolerantArray.includes("gluten")) {
            $("#intolerance3").prop("checked", true);
        }
        if (intolerantArray.includes("grain")) {
            $("#intolerance4").prop("checked", true);
        }
        if (intolerantArray.includes("peanut")) {
            $("#intolerance5").prop("checked", true);
        }
        if (intolerantArray.includes("seafood")) {
            $("#intolerance6").prop("checked", true);
        }
        if (intolerantArray.includes("sesame")) {
            $("#intolerance7").prop("checked", true);
        }
        if (intolerantArray.includes("shellfish")) {
            $("#intolerance8").prop("checked", true);
        }
        if (intolerantArray.includes("soy")) {
            $("#intolerance9").prop("checked", true);
        }
        if (intolerantArray.includes("sulfite")) {
            $("#intolerance10").prop("checked", true);
        }
        if (intolerantArray.includes("treenut")) {
            $("#intolerance11").prop("checked", true);
        }
        if (intolerantArray.includes("wheat")) {
            $("#intolerance12").prop("checked", true);
        }
    }
}


// this function takes the stored intolerances and compiles them into a variable that is the paramater for the api call. It then calls the api
function compileParams() {

    // this checks to see if there is anything in the intolerant array
    if (intolerantArray.length !== 0) {

        // this starts the intolerant parametor for the api
        intolerantParams = "&intolerances="

        // this goes throug the array and adds each intolerant to the string that will be used as a parametor
        for (let index = 0; index < intolerantArray.length; index++) {
            let element = intolerantArray[index];
            intolerantParams += `${element},`
        }

        // removes the last comma in the string
        paramsArray = intolerantParams.split("")
        paramsArray.pop()
        intolerantParams = paramsArray.join("")
    }

    // calling the api for recipes
    // callAPI()
}



// this function adds a serch term to the spoonacular api call
function addSearchTerm() {

    //  this adds the searched value to the search term variable. 
    let searchItem = $("#search").val();
    searchTerm = "&query=" + searchItem

    // this calls the spoonacular api
    // callAPI()
}







// builds an object based on the ingredients in the chosen recipe
const saveRecipeToDb = async (e) => {

    console.log(e);

    const id = e.attr("data-id")

    const response = await fetch(`/api/recipe/spoon/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })

    let dataBack;
    await response.json().then(data => { dataBack = data });

    sendRecipeToDb(dataBack)
}

const sendRecipeToDb = async (data2) => {


    console.log(data2);

    let savedRecipeObj = {
        name: "",
        ingredients: "",
        instructions: "",
        favorite: false,
        created: false,
        human: true
    }

    // this runs through each ingredient
    for (let index = 0; index < data2.extendedIngredients.length; index++) {

        // this declares variables for the amount of the ingredent, the unit, and the name
        let amount = data2.extendedIngredients[index].measures.us.amount
        let unit = data2.extendedIngredients[index].measures.us.unitLong
        let name = data2.extendedIngredients[index].name

        // This creates a line of the amount, unit, and name of the ingredient and sets it to the
        savedRecipeObj.ingredients += (amount + " " + unit + " " + name + "<br>")
    }


    // this runs through each step in the instructions and adds them to the steps variable
    for (let index = 0; index < data2.analyzedInstructions[0].steps.length; index++) {
        savedRecipeObj.instructions += ((index + 1) + " " + data2.analyzedInstructions[0].steps[index].step + " " + "<br>")
    }

    // this sets the name of the recipe and gives it a data id number
    savedRecipeObj.name = data2.title

    console.log(savedRecipeObj);


    const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify(savedRecipeObj),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/recipe');
    }
};



// starts of page load
init()



saveRecipeToDbBtn.on('click', function () {
    saveRecipeToDb($(this))
})


//event listeners 
$("#save-btn").on("click", saveInts)
$("#see-recipe-btn").on("click", saveInts)



$("#search-google-btn").on("click", searchGoogleMaps)


// // this takes the user to the recipe page
// $("#go-to-recipes-button").on("click", function () {
//     document.location.replace('./recipes.html');
// })


// this is an event listener for the dropdown
let dropdown = $(".dropdown")
dropdown.on("click", function (e) {
    dropdown.toggleClass('is-active');
    if (e.target.type === "checkbox" || $(this).is("label")) {
        dropdown.toggleClass('is-active');
    }
    saveInts()

})

// this saves the recipes
$("#search-btn").on("click", function (e) {
    e.preventDefault()
    saveInts()
})


// this listes for the save button to be clicked. If they are clicked it then calls the api, and disables the buttons
$("#recipe-save-1").on("click", function () {
    recipeID = recipeIDArray[0]
    callAPIByID(recipeID)
    disableBtn1();
});
$("#recipe-save-2").on("click", function () {
    recipeID = recipeIDArray[1]
    callAPIByID(recipeID)
    disableBtn2();
});
$("#recipe-save-3").on("click", function () {
    recipeID = recipeIDArray[2]
    callAPIByID(recipeID)
    disableBtn3();
});
$("#recipe-save-4").on("click", function () {
    recipeID = recipeIDArray[3]
    callAPIByID(recipeID)
    disableBtn4();
});
$("#recipe-save-5").on("click", function () {
    recipeID = recipeIDArray[4]
    callAPIByID(recipeID)
    disableBtn5();
});
$("#recipe-save-6").on("click", function () {
    recipeID = recipeIDArray[5]
    callAPIByID(recipeID)
    disableBtn6();
});


// this changes the save recipe buttons to disabled
function disableBtn1() {
    document.getElementById("recipe-save-1").disabled = true;
}
function disableBtn2() {
    document.getElementById("recipe-save-2").disabled = true;
}
function disableBtn3() {
    document.getElementById("recipe-save-3").disabled = true;
}
function disableBtn4() {
    document.getElementById("recipe-save-4").disabled = true;
}
function disableBtn5() {
    document.getElementById("recipe-save-5").disabled = true;
}
function disableBtn6() {
    document.getElementById("recipe-save-6").disabled = true;
}


