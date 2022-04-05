// declaring variables
let modalBtn = $("#modal-btn")

let intolerantArray = [];

let recipeIDArray = [];
let recipeID = 0;


const saveRecipeToDbBtn = $('.save-recipe-to-db')

// this function allows the user to search for places 
const searchGoogleMaps = async () => {


    // this defines the search term
    let userSearchTerm = $("#google-search-bar").val()


    const findASearch = await fetch(`/search-google-maps`, {
        method: 'POST',
        body: JSON.stringify({ userSearchTerm }),
        headers: { 'Content-Type': 'application/json' },
    });
}

const searchForRecipe = async () => {

    //  this adds the searched value to the search term variable. 
    const searchItem = $("#search").val();

    const findASearch = await fetch(`/searched-recipe`, {
        method: 'POST',
        body: JSON.stringify({ searchItem }),
        headers: { 'Content-Type': 'application/json' },
    });
}


// this function checks the values of all of the intolerances the user enters. It also starts a cascading series of events to recreate the cards on the index.html page given the new values.
function saveInts() {

    // this clears local storage and the old array before adding what we currently want to save
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


// this function is designed to check everything in local storage and set the variables to them
const getStoredIntolerants = async () => {


    const response = await fetch(`/api/users/get-stored-ints`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })

    let dataBack;
    await response.json().then(data => { dataBack = data });
    let splitOnComma
    if (dataBack) {
        let splitOnEqual = dataBack.split("=")

        splitOnComma = splitOnEqual[1].split(",")

        // this checks if the items are in the array. if they are the boxes are then checked
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


// this function takes the stored intolerances and compiles them into a variable that is the paramater for the api call. It then calls the api
const compileIntolerances = async () => {



    let intolerantParams = "";
    saveInts()

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



    const response = await fetch(`/api/users/intolerances`, {
        method: 'PUT',
        body: JSON.stringify({ intolerantParams }),
        headers: { 'Content-Type': 'application/json' },
    });


}




function init() {

    getStoredIntolerants()
}





// builds an object based on the ingredients in the chosen recipe
const saveRecipeToDb = async (e) => {

 
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



    const response = await fetch('/api/recipe/new', {
        method: 'POST',
        body: JSON.stringify(savedRecipeObj),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/recipe');
    }
};



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

    compileIntolerances()

})

// this saves the recipes
$("#search-btn").on("click", function (e) {
    e.preventDefault()
    searchForRecipe()
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


