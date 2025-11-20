// Router setup
const express = require('express');
const router = express.Router();

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

// List all available books
router.get('/list', (req, res, next) => {
    const sql = 'SELECT * FROM books';

    db.query(sql, (err, result) => {
        if (err) return next(err);
        res.render('list.ejs', { availableBooks: result });
    });
});

// Show books that cost less than £20
router.get('/bargainbooks', (req, res, next) => {
    const sql = 'SELECT * FROM books WHERE price < 20';

    db.query(sql, (err, result) => {
        if (err) return next(err);
        res.render('bargainbooks.ejs', { bargainBooks: result });
    });
});

// Export the router so it can be used in index.js
module.exports = router;
