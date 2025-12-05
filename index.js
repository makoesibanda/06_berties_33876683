require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql2');
const path = require('path');
const request = require('request');   // used to call external APIs (OpenWeather)


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


const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);


 // Weather route using EJS (weather.ejs)
 app.get('/weather', function (req, res) {

    let apiKey = 'ef604080244c70a937f9627093383f15';
    // If the user has not entered a city yet, just show the page
    if (req.query.city === undefined) {
        res.render('weather', { weatherMsg: null });
    } 
    else {
        let city = req.query.city;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        request(url, function (err, response, body) {
            if (err) {
                res.render('weather', { weatherMsg: 'Error fetching weather data' });
            } 
           else {

    var weather = JSON.parse(body);

            // Error handling 
            if (weather !== undefined && weather.main !== undefined) {

                var wmsg = 
                    'It is ' + weather.main.temp + ' degrees in ' + weather.name + '<br>' +
                    'Humidity: ' + weather.main.humidity + '<br>' +
                    'Wind speed: ' + weather.wind.speed + '<br>' +
                    'Weather: ' + weather.weather[0].description;

                res.render('weather', { weatherMsg: wmsg });

            }
            else {
                res.render('weather', { weatherMsg: 'No data found' });
            }
        }


        });

    }

});



// Start server
app.listen(port, () => {
    console.log('App running on port ' + port);
});
