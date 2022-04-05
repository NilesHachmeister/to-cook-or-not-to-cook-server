const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// route is /api/users/


// this creates a new user into the database based on the input 
router.post('/', async (req, res) => {

    // this creates the user
    try {

        const newUser = req.body;
        // this bcrypts the password so that it can be stored safely
        newUser.password = await bcrypt.hash(req.body.password, 10);

        const dbUserData = await User.create(newUser);

        // this saves the user as logged in
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;


        });

        console.log(req.session.loggedIn);


        res.status(200).json(dbUserData);
        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this allows an existing user to loggin
router.post('/login', async (req, res) => {

    // this takes the users data and figures out if it is valid or not.
    try {
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        // this checks to see if there is a valid user
        if (!dbUserData) {
            res
                .status(400)
                .json({ message: 'Incorrect login information. Please try again or sign up. Thank you.' });
            return;
        }

        // this checks if the password is valid
        const validPassword = await bcrypt.compare(
            req.body.password,
            dbUserData.password
        );;

        // if the password is not valid the user is asked to try again
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect login information. Please try again or sign up. Thank you.' });
            return;
        }

        // this saves the user as currently logged in
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
        });

        // catches any errors.
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


router.post('/logout', async (req, res) => {

    if (req.session.loggedIn) {

        req.session.destroy(() => {
            res.redirect('/');
            return;
        });
    } else {
        res.status(404).end();
    }
});





module.exports = router;