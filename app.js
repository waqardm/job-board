// Importing modules
const express = require('express');
const path = require('path');

// Importing Config
const config = require('./util/config');

// Importing Database Connection
const sequelize = require('./util/database');

// Importing middlewares
const initialMiddleware = require('./middlewares/initial');

// Importing Routers
const generalRouter = require('./routers/general');

// Initializing App
const app = express();

// Setting View Engine (EJS)
app.set('view engine', 'ejs');

// Setting Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Setting Initial Middlewares
app.use(initialMiddleware);

// Setting routes
app.use(generalRouter);


// Error Pages
app.use((req, res) => {
    res.render('404', {
        pageTitle: 'Page Not Found'
    });
})

app.use((error, req, res, next) => {
    console.log(error);
    res.render('500', {
        pageTitle: 'Server Error'
    })
})

// Connecting To Database
sequelize.sync()
    .then(() => {
        // Starting the server
        app.listen(config.PORT, () => {
            console.log('Server Started on PORT : ' + config.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });