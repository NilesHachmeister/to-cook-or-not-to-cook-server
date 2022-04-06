const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;


// this file lets us connect with mysql to interact with the dabatase
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        { host: 'localhost', dialect: 'mysql', port: 3306 }
    );
}
app.use(session({
    secret: 'secretidhere', 
    resave: false, 
    saveUninitialized: false
  }))

module.exports = sequelize;