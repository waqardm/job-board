const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const MySqlStore = require('express-mysql-session')(session);

const config = require('../util/config');


// Setting MySQL store for Session
const store = new MySqlStore({
    host: config.DB.HOST,
    port: config.DB.PORT,
    user: config.DB.USER,
    password: config.DB.PASSWORD,
    database: config.DB.DB_NAME 
});

module.exports = [

    // Body Parser to parse form body
    bodyParser.urlencoded({ extended: false }),

    // Setting Session
    session({
        secret: config.SESSION.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store
    }),

    // To flash messages
    flash(),

    // Setting Local variables
    (req, res, next) => {
        req.user = req.session.user;
        res.locals.user = req.session.user;
        res.locals.errors = req.flash('errors');
        res.locals.success = req.flash('success');
        if(res.locals.errors.length > 0) {
            res.status(422);
        }
        next();
    }
];