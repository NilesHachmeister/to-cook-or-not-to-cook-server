const submitSignupBtn = $('#submit-sign-up-btn');
const submitLoginBtn = $('#submit-login-btn');
const logOutBtn = $('#logout-btn');

// this checks if the user has their login information in local storage
function init() {

    // getting information from local storage
    const email = JSON.parse(localStorage.getItem("email"))
    const password = JSON.parse(localStorage.getItem("password"))
    const checked = JSON.parse(localStorage.getItem("checked"))

    // if the user has chosen to be remembered then their infromation in autofilled. If not then local storage is cleared
    if (checked) {
        $('#login-email').val(email)
        $('#login-password').val(password)
        $('#remember-me').prop("checked", true);
    } else {
        localStorage.clear();
    }
}

// this function allows a new user to sign up
const signupNewUser = async (e) => {
    e.preventDefault();

    // getting input from the different text areas
    const rawUserName = $('#new-account-name');
    const rawEmail = $('#new-account-email');
    const rawPassword = $('#new-account-password');

    // turning that input into usable data
    const users_name = rawUserName.val().trim();
    const email = rawEmail.val().trim();
    const password = rawPassword.val().trim();

    // this checks to make sure the email is valid
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexEmail)) {
        alert("must be a valid email, please try again")
    }

    // this checks if the password the user inputed is at least 8 characters long. If it is not the user is alerted
    if (password.split("").length < 8) {
        alert("password must be at least 8 characters long. Please try again");
        return;
    }

    // if all of the input fields have information in them then the information is sent to the server to be stored in a database
    if (users_name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ users_name: users_name, email: email, password: password, }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if the information is saved then the user is taken back to the homepage
        if (response.ok) {
            document.location.replace('/');
        } else {

            // gets the response back from the db and turns it into a usable form
            let dataBackFromDb;
            await response.json().then(data => { dataBackFromDb = data });

            // this checks to make sure that there isnt already a user with the email address.
            if (dataBackFromDb.parent.code === "ER_DUP_ENTRY") {
                alert('There is already an account with that email address. Please try again')
            } else {
                alert('Failed to sign up, please try again');
            }

        }
    }
    else {
        alert('Please enter a valid username and password ');
    }
};

// this allows a new user to loggin
const logUserIn = async (e) => {
    e.preventDefault();

    // getting input from the different text areas
    const rawEmail = $('#login-email');
    const rawPassword = $('#login-password');

    // turning that input into usable data
    const email = rawEmail.val().trim();
    const password = rawPassword.val().trim();

    // this checks to see if the remember me checkbox is checked. If it is then the users information is saved into local storage
    if ($('#remember-me').is(':checked')) {
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("password", JSON.stringify(password));
        localStorage.setItem("checked", JSON.stringify(true));

    } else {
        localStorage.setItem("checked", JSON.stringify(false));
    }

    //   if there is both an email and password they are sent to the server to check the database
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if the credintials are corret the user is then logged in and they are sent to the recipe page
        if (response.ok) {
            document.location.replace('/recipe');
        } else {
            alert('Failed to log in, please try again');
        }
    }
};

// this logs a user out
const logoutUser = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        body: JSON.stringify(),
        headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace('/');
}

// starts on page load
init()

// event listeners to trigger each function
submitSignupBtn.on('click', signupNewUser);
submitLoginBtn.on('click', logUserIn);
logOutBtn.on('click', logoutUser)
