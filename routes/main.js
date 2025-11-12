// Create a new router
const express = require("express")
const router = express.Router()

// List all books
router.get('/list', function (req, res, next) {
  const sqlquery = "SELECT * FROM books";
  db.query(sqlquery, (err, result) => {
    if (err) return next(err);
    res.render('list.ejs', { availableBooks: result });
  });
});

// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

// Export the router object so index.js can access it
module.exports = router