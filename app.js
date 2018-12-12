// Importing modules
const express = require('express');
const path = require('path');

// Importing Config
const config = require('./util/config');

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

// Starting the server
app.listen(config.PORT, () => {
    console.log('Server Started On Port : ' + config.PORT );
});