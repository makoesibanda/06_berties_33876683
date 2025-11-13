// Set up the router
const express = require("express");
const router = express.Router();

// List all books
router.get('/list', function (req, res, next) {
    const sqlquery = "SELECT * FROM books";

    db.query(sqlquery, (err, result) => {
        if (err) return next(err);
        res.render('list.ejs', { availableBooks: result });
    });
});

// Home page
router.get('/', function (req, res) {
    res.render('index.ejs');
});

// About page
router.get('/about', function (req, res) {
    res.render('about.ejs');
});

// Add book form page
router.get('/addbook', function (req, res) {
    res.render('addbook.ejs');
});

// Handle form submission and save book to the database
router.post('/bookadded', function (req, res, next) {

    const sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";
    const newrecord = [req.body.name, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) return next(err);

        res.render('bookadded.ejs', {
            bookName: req.body.name,
            bookPrice: req.body.price
        });
    });
});

// Export the router
module.exports = router;
