require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 8000;

var session = require ('express-session')

// Use EJS as view engine
app.set('view engine', 'ejs');

// Handle form data
app.use(express.urlencoded({ extended: true }));

const expressSanitizer = require('express-sanitizer');

// Create an input sanitizer
app.use(expressSanitizer());


// Public folder for css and static files
app.use(express.static(path.join(__dirname, 'public')));

// Create a session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))


// Basic app data
app.locals.shopData = { shopName: "Bertie's Books" };

// Database connection using .env values
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

global.db = db;

// Load routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

const booksRoutes = require('./routes/books');
app.use('/books', booksRoutes);

// Start server
app.listen(port, () => {
    console.log('App running on port ' + port);
});
