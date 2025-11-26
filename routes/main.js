// Set up the router
const express = require("express");
const router = express.Router();

// Middleware to restrict access unless logged in
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('users/login')   
    } else {
        next()
    }
}


// List all books
router.get('books/list', redirectLogin,function (req, res, next) {
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
router.get('/addbook',redirectLogin, function (req, res) {
    res.render('addbook.ejs');
});

/// Handle form submission and save book to the database
router.post('/bookadded',redirectLogin, function (req, res, next) {

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

//logout router 

router.get('/logout', redirectLogin, (req,res) => {
        req.session.destroy(err => {
        if (err) {
          return res.redirect('./')
        }
        res.send('you are now logged out. <a href='+'./'+'>Home</a>');
        })
    })


/// Export the router
module.exports = router;
