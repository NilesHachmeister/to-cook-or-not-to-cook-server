// this checks to see if the user is loggedin
const logginCheck = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next()
    }
};

module.exports = logginCheck;