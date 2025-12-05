// Router setup
const express = require('express');
const router = express.Router();

// Middleware: protect routes that require login
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('../users/login');  // redirect to login if not logged in
    } else {
        next(); // allow access
    }
};

// Display the basic search page
router.get('/search', (req, res) => {
    res.render('search.ejs');
});

// Handle advanced search using partial text matching (LIKE)
router.get('/search-result', (req, res, next) => {
    const keyword = req.query.keyword;
    const sql = 'SELECT * FROM books WHERE name LIKE ?';
    const searchValue = '%' + keyword + '%'; // Allow partial matching

    db.query(sql, [searchValue], (err, result) => {
        if (err) return next(err);
        res.render('search-results.ejs', { searchedBooks: result, keyword: keyword });
    });
});

// List all available books and also added the access control feature
router.get('/list', redirectLogin,(req, res, next) => {
    const sql = 'SELECT * FROM books';

    db.query(sql, (err, result) => {
        if (err) return next(err);
        res.render('list.ejs', { availableBooks: result });
    });
});

router.get('/addbook', redirectLogin, (req, res) => {
    res.render('addbook.ejs');
});

router.post('/addbook', redirectLogin, (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;

    const sql = "INSERT INTO books (name, price) VALUES (?, ?)";

    db.query(sql, [name, price], (err, result) => {
        if (err) return next(err);
        res.redirect('/books/list');
    });
});


///Show books that cost less than £20 and also added the access control feature
router.get('/bargainbooks', (req, res, next) => {
    const sql = 'SELECT * FROM books WHERE price < 20';

    db.query(sql, (err, result) => {
        if (err) return next(err);
        res.render('bargainbooks.ejs', { bargainBooks: result });
    });
});

// Export the router so it can be used in index.js
module.exports = router;
