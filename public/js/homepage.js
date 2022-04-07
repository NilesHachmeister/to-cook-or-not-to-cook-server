// declaring global variable
const intolerantArray = [];

// this function runs on initialization and gets the intolerances to populate the checkboxes with what the user currently has
function init() {
    getStoredIntolerants()
}

// this function is designed to check the intolerances stared in the database and check each box accordingly
const getStoredIntolerants = async () => {

    // this calls the server to get the current users stored intolerances
    const response = await fetch(`/api/users/get-stored-ints`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    // this takes the data from the db and turns it into usable data
    let dataBackFromDb;
    await response.json().then(data => { dataBackFromDb = data });

    // if there is data on stored intolerances then it is pushed into an array
    if (dataBackFromDb) {
        let splitOnComma
        let splitOnEqual = dataBackFromDb.split("=")
        splitOnComma = splitOnEqual[1].split(",")

        // this checks each item in the array. If an intoreance is in the array then the box is checked
        if (splitOnComma.includes("dairy")) {
            $("#intolerance1").prop("checked", true);
        }
        if (splitOnComma.includes("egg")) {
            $("#intolerance2").prop("checked", true);
        }
        if (splitOnComma.includes("gluten")) {
            $("#intolerance3").prop("checked", true);
        }
        if (splitOnComma.includes("grain")) {
            $("#intolerance4").prop("checked", true);
        }
        if (splitOnComma.includes("peanut")) {
            $("#intolerance5").prop("checked", true);
        }
        if (splitOnComma.includes("seafood")) {
            $("#intolerance6").prop("checked", true);
        }
        if (splitOnComma.includes("sesame")) {
            $("#intolerance7").prop("checked", true);
        }
        if (splitOnComma.includes("shellfish")) {
            $("#intolerance8").prop("checked", true);
        }
        if (splitOnComma.includes("soy")) {
            $("#intolerance9").prop("checked", true);
        }
        if (splitOnComma.includes("sulfite")) {
            $("#intolerance10").prop("checked", true);
        }
        if (splitOnComma.includes("treenut")) {
            $("#intolerance11").prop("checked", true);
        }
        if (splitOnComma.includes("wheat")) {
            $("#intolerance12").prop("checked", true);
        }
    }
}

// this function allows the user to search for places 
const searchGoogleMaps = async () => {

    // this defines the search term
    const userSearchTerm = $("#google-search-bar").val()

    // this replaces the location, calling the server, and relocating the view pont on the map
    document.location.replace(`/search-item/${userSearchTerm}#map-holder`);
}

// this function allows the user to search for a recipe
const searchForRecipe = async () => {

    //  this defines the search term. 
    const searchItem = $("#search").val();

    // this replaces the location, calling the server so the page is repopulated with the found recipes
    document.location.replace(`/search-item/${searchItem}`);
}


// this function checks the values of all of the intolerances the user enters. 
function saveIntolerances() {

    // this clears the intolerant array before adding intolerances to it
    intolerantArray = [];

    // this checks each checkbox, if they are checked the value is pushed into the array
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
}

// this function takes the stored intolerances and compiles them into a variable that is then sent to the server to be stored in the database
const compileIntolerances = async () => {

    let intolerantParams = "";
    saveIntolerances()

    // this checks to see if there is anything in the intolerant array
    if (intolerantArray.length !== 0) {

        // this starts the intolerant parametor for the stored data
        intolerantParams = "&intolerances="

        // this goes through the array and adds each intolerant to the string that will be used as a parametor
        for (let index = 0; index < intolerantArray.length; index++) {
            let element = intolerantArray[index];
            intolerantParams += `${element},`
        }

        // removes the last comma in the string
        paramsArray = intolerantParams.split("")
        paramsArray.pop()
        intolerantParams = paramsArray.join("")
    }

    // this calls the server to store the intolerances in the database
    const response = await fetch(`/api/users/intolerances`, {
        method: 'PUT',
        body: JSON.stringify({ intolerantParams }),
        headers: { 'Content-Type': 'application/json' },
    });
}

// builds an object based on the data for a specific recipe
const saveRecipeToDb = async (e) => {

    // this finds the id of the selected recipe
    const id = e.attr("data-id")

    // this calls the server to find information on the specified recipe
    const response = await fetch(`/api/recipe/spoon/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    // this takes the data from the db and turns it into usable data
    let dataBackFromDb;
    await response.json().then(data => { dataBackFromDb = data });

    // this then sends the recipe to the database to be stored
    sendRecipeToDb(dataBackFromDb)
}

// this takes the data and turns it into useable information to be sent to the database
const sendRecipeToDb = async (dataOnSpecificRecipe) => {

    // declaring the object to be saved
    let savedRecipeObj = {
        name: "",
        ingredients: "",
        instructions: "",
        favorite: false,
        created: false,
        human: true
    }

    // this runs through each ingredient
    for (let index = 0; index < dataOnSpecificRecipe.extendedIngredients.length; index++) {

        // this declares variables for the amount of the ingredent, the unit, and the name
        let amount = dataOnSpecificRecipe.extendedIngredients[index].measures.us.amount
        let unit = dataOnSpecificRecipe.extendedIngredients[index].measures.us.unitLong
        let name = dataOnSpecificRecipe.extendedIngredients[index].name

        // This creates a line of the amount, unit, and name of the ingredient and sets it to the
        savedRecipeObj.ingredients += (amount + " " + unit + " " + name + "<br>")
    }


    // this runs through each step in the instructions and adds them to the steps variable
    for (let index = 0; index < dataOnSpecificRecipe.analyzedInstructions[0].steps.length; index++) {
        savedRecipeObj.instructions += ((index + 1) + " " + dataOnSpecificRecipe.analyzedInstructions[0].steps[index].step + " " + "<br>")
    }

    // this sets the name of the recipe and gives it a data id number
    savedRecipeObj.name = dataOnSpecificRecipe.title

    // calling the server to put save the recipe object into the database
    const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify(savedRecipeObj),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/recipe');
    }
};

// runs when the page is loaded
init()

//event listeners 
$("#save-btn").on("click", saveIntolerances)
$("#see-recipe-btn").on("click", function () {
    document.location.reload();
})
$('.save-recipe-to-db').on('click', function () {
    saveRecipeToDb($(this))
})
$("#search-google-btn").on("click", searchGoogleMaps)

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
    searchForRecipe()
})