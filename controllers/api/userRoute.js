const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

// route is /api/users/

// this creates a new user into the database based on the input 
router.post('/', async (req, res) => {


    try {
        const newUser = req.body;

        // this bcrypts the password so that it can be stored safely
        newUser.password = await bcrypt.hash(req.body.password, 10);

        // this creates the user
        const dbUserData = await User.create(newUser);

        // this saves the user as logged in and assigns the session the user id
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = dbUserData.id;
            res.status(200).json(dbUserData);
        });

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
                email: req.body.email,
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

// this logs out a user
router.post('/logout', async (req, res) => {

    // if the user is logged in the session is destroyed and the user is taken back to the homepage.
    if (req.session.loggedIn) {

        req.session.destroy(() => {
            res.redirect('/');
            return;
        });
    } else {
        res.status(404).end();
    }
});

// this updates a users intolerances
router.put('/intolerances', async (req, res) => {

    // this updates the intolerances based on what is sent in where the user id matches the logged in user.
    try {
        const userData = await User.update(
            {
                intolerances: req.body.intolerantParams,
            },
            {
                where: {
                    id: req.session.user_id,
                },
            });
        res.status(200).json(userData)

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this gets all stored intolerances from the currently logged in user
router.get('/get-stored-ints', async (req, res) => {

    let intolerantParams = "";

    // if the user is logged in then we find the users information based on the session user id and get the intolerances from that object.
    try {
        if (req.session.loggedIn) {
            const findUserData = await User.findByPk(req.session.user_id);
            const user = findUserData.get({ plain: true });
            intolerantParams = user.intolerances
        }

        // returns the saved intolerances to the front end
        res.json(intolerantParams);

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;