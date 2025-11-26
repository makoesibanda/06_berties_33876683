// Set up router
const express = require('express');
const router = express.Router();

// bcrypt for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10; // Hashing strength

/// Middleware to protect routes (only logged-in users can access)
const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('.../users/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}


// Show registration form
router.get('/register', (req, res) => {
    res.render('register.ejs');
});

// Handle user registration
router.post('/registered', (req, res) => {
    const plainPassword = req.body.password; // User's entered password

    // Hash the password before saving
    bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.log(err);
            return res.send('Error processing password');
        }

        const sql = `
            INSERT INTO users (username, first, last, email, hashedPassword)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            req.body.username,
            req.body.first,
            req.body.last,
            req.body.email,
            hashedPassword
        ];

        db.query(sql, values, (err) => {
            if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.send("Registration failed: Username already exists. Please choose another one.");
            } else {
                console.log(err); // Still log full error for development
                return res.send("Error saving user to database");
            }
            }


            // Showing hashed password is only for lab testing
            res.send(
                'Hello ' + req.body.first + ' ' + req.body.last +
                '. You are now registered. Email: ' + req.body.email +
                '. Password: ' + req.body.password +
                ' | Hashed: ' + hashedPassword
            );
        });
    });
});

// List users (no passwords displayed)
router.get('/list', redirectLogin, (req, res) => {
     const sql = 'SELECT username, first, last, email FROM users';

    db.query(sql, (err, results) => {
        if (err) return res.send('Error loading users');
        res.render('listusers.ejs', { usersData: results });
    });
   
});

// Show login page
router.get('/login', (req, res) => {
    res.render('login.ejs');
});

// Handle login
router.post('/loggedin', (req, res) => {
    const username = req.body.username;
    const passwordEntered = req.body.password;

    const sql = 'SELECT hashedPassword FROM users WHERE username = ?';

    db.query(sql, [username], (err, results) => {
        if (err) return res.send('Error checking login');

        if (results.length === 0) {
            db.query("INSERT INTO audit (username, loginTime, status) VALUES (?, NOW(), 'fail')", [username]);
            return res.send('Login failed: user not found');
        }

        const storedHash = results[0].hashedPassword;

        // Compare entered password with stored hash
        bcrypt.compare(passwordEntered, storedHash, (err, match) => {
            if (err) return res.send('Error during verification');

            if (match) {

                // Save user session here, when login is successful
                req.session.userId = req.body.username;

                db.query("INSERT INTO audit (username, loginTime, status) VALUES (?, NOW(), 'success')", [username]);
                res.send('Login successful, welcome ' + username);
                

            } else {
                db.query("INSERT INTO audit (username, loginTime, status) VALUES (?, NOW(), 'fail')", [username]);
                res.send('Login failed: incorrect password');
            }
        });
    });
});

// Show audit log
router.get('/audit', redirectLogin, (req, res) => {

    const sql = 'SELECT * FROM audit ORDER BY loginTime DESC';

    db.query(sql, (err, results) => {
        if (err) return res.send('Error loading audit log');
        res.render('audit.ejs', { auditData: results });
    });
});

// Make router available in index.js
module.exports = router;
