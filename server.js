const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// declaring app and our PORT
const app = express();
const PORT = process.env.PORT || 3001;

// allowing for helpers in handlebars
const hbs = exphbs.create({ helpers });

// creating our session data
const sess = {
    secret: process.env.SESSIONS_SECRET,
    cookie: {

        maxAge: 600000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        cookie: { secure: !true }
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

// using handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// allowing for datatypes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creating our public folder as static
app.use(express.static(path.join(__dirname, '/public')));

// using routes
app.use(routes);

// running the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}/`));
});


module.exports = app;