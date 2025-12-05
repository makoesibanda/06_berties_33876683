var express = require('express');
var router = express.Router();

// GET all books OR search by keyword OR filter by price range
router.get('/books', function (req, res, next) {

    // Read query parameters from the URL
    let search = req.query.search;
    let minprice = req.query.minprice;

    // Accept BOTH maxprice and max_price (worksheet uses max_price)
    //I did this because the worksheet have two different version, one with '_' and the other one wuthou
    //So I am trying to keep my work safe when marked
    let maxprice = req.query.maxprice || req.query.max_price;
    let sort = req.query.sort;   // used to sort results by name or price


    // Start with a base query that always works
    let sqlquery = "SELECT * FROM books WHERE 1=1";
    let queryParams = [];

    // If a search term is provided, filter by book name
    if (search !== undefined) {
        sqlquery += " AND name LIKE ?";
        queryParams.push('%' + search + '%');
    }

    // If a minimum price is provided, filter by minimum price
    if (minprice !== undefined) {
        sqlquery += " AND price >= ?";
        queryParams.push(minprice);
    }

    // If a maximum price is provided, filter by maximum price
    if (maxprice !== undefined) {
        sqlquery += " AND price <= ?";
        queryParams.push(maxprice);
    }

   
    // Sorting option (extension task)
    if (sort !== undefined) {
        if (sort === 'name') {
            sqlquery += " ORDER BY name ASC";
        }
        else if (sort === 'price') {
            sqlquery += " ORDER BY price ASC";
        }
    }



    // Run the SQL query with parameters
    db.query(sqlquery, queryParams, (err, result) => {

        if (err) {
            // If something goes wrong, return the error as JSON
            res.json(err);
            next(err);
        }
        else {
            // Return the filtered (or full) book list as JSON
            res.json(result);
        }

    });

});

// Export the router
module.exports = router;
