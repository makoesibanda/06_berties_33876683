# Lab 8b – Sanitisation and Validation

## Overview
In this lab I improved the security of my web application by adding validation and sanitisation. I used `express-validator` to check that users enter proper details (for example a valid email or a password of the right length) before the data is saved. I also used `express-sanitizer` to remove any harmful code from user input.

I tested an actual XSS example using `<script>alert("Gotcha!")</script>` and confirmed it could run before sanitisation. After applying sanitisation, it was safely removed. This made me understand how user input can be used to attack a system if not cleaned.

Overall, the lab helped me make my application more reliable and safe against incorrect or malicious data.

## Validation

I used `express-validator` to make sure users enter correct and complete details before anything gets stored.

### On the registration form, I validated:
- **Email** – must be a proper email format  
- **Username** – between 5 and 20 characters  
- **Password** – minimum 8 characters  
- **First and last name** – cannot be empty

If any of these checks fail, the user is sent back to the registration page.

### On the Add Book form (extension task), I added:
- **Book name** – must not be empty  
- **Price** – must be a number and at least 0

This ensures invalid data or missing fields cannot be submitted.

Overall, validation helped control what users are allowed to submit and prevents bad or incomplete data from entering the system.

## Demonstrating XSS Vulnerability

Before adding sanitisation, I tested if the system was vulnerable to Cross-Site Scripting (XSS). On the registration page, I entered the following in the **First Name** field:

`Henry <script>alert("Gotcha!")</script>`

After submitting, the browser displayed a JavaScript popup saying **“Gotcha!”**, which means the malicious script was executed. This happened because the input was shown back on the page without being cleaned or escaped.

This confirmed that the page was vulnerable to XSS attacks, as it allowed user input to inject and run JavaScript code directly in the browser.

## Sanitisation

To protect the application against XSS attacks, I installed and activated the `express-sanitizer` module in `index.js` using `app.use(expressSanitizer());`. I then sanitised any input that could later be shown back to the user.

### Fields Sanitised
These inputs were sanitised with `req.sanitize()` before inserting into the database:
- `username`
- `first`
- `last`
- `book name`

These fields were cleaned because they are user-controlled and may be displayed directly on pages, making them potential targets for malicious scripts.

### Fields Not Sanitised
- `email` → validated but not shown back in a way that could execute code.
- `password` → hashed and never displayed, so sanitising is not necessary.

After implementing sanitisation, I re-tested using an XSS payload. The JavaScript code was removed instead of executed, confirming that the sanitiser successfully blocked the attack.
    
### Conclusion

This lab helped strengthen the security and reliability of my application. I introduced validation to prevent incorrect user input and sanitisation to protect against cross-site scripting (XSS) attacks. I was able to demonstrate how an XSS exploit could happen and then fully prevent it using `express-sanitizer`.

I also applied additional validation and sanitisation to other forms where appropriate, while avoiding it in fields that either don’t pose a risk or are securely handled (such as passwords and emails).

Overall, the application now handles user input safely, rejects invalid data, and protects against script injection. The system remains usable and functional, but with stronger security in place.
