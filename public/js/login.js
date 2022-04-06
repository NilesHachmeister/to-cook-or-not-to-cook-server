const submitSignupBtn = $('#submit-sign-up-btn');
const submitLoginBtn = $('#submit-login-btn');
const logOutBtn = $('#logout-btn');

// this function allows a new user to sign up
const signupNewUser = async (e) => {
    e.preventDefault();

    const rawUserName = $('#new-account-name');
    const rawEmail = $('#new-account-email');
    const rawPassword = $('#new-account-password');

    const users_name = rawUserName.val().trim();
    const email = rawEmail.val().trim();
    const password = rawPassword.val().trim();

    if (password.split("").length < 8) {
        alert("password must be at least 8 characters long. Please try again");
        return;
    }

    if (users_name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ users_name: users_name, email: email, password: password, }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up, please try again');
        }
    }
    else {
        alert('Please enter a valid username and password ');
    }
};

// this allows a new user to loggin
const logUserIn = async (e) => {
    e.preventDefault();

    const email = $('#login-email').text.trim();
    const password = $('#login-password').text.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/recipe');
        } else {
            alert('Failed to log in, please try again');
        }
    }
};


const logoutUser = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        body: JSON.stringify(),
        headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace('/');

}


// event listeners to trigger each function
submitSignupBtn.on('click', signupNewUser);
submitLoginBtn.on('click', logUserIn);
logOutBtn.on('click', logoutUser)
