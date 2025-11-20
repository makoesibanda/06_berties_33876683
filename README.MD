# Lab 7 – Password Hashing

## Overview
This lab focused on improving the security of the Berties Books web application. I added password hashing using bcrypt, included a login system, secured the database credentials with dotenv and introduced audit logging to track both successful and unsuccessful login attempts. All work was carried out using the existing project from Lab 6.

---

## Part A – Password Hashing

### Registration
I updated the registration form to include username and password fields. In `users.js`, I retrieved the entered password via `req.body.password` and hashed it using bcrypt with 10 salt rounds before saving it to the database. Only the hashed version is stored.

I created a new `users` table with the following fields:
- username  
- first name  
- last name  
- email  
- hashedPassword  

During testing, I temporarily displayed both the entered and hashed passwords (as instructed for debugging). This was removed afterwards.

### List Users
I added the route `/users/list` to display the registered users. It shows username, first name, last name and email only – no password details.

### Login
I created a login form at `/users/login`. On submitting the form, `/users/loggedin` checks the entered credentials by using `bcrypt.compare`. If the password matches the stored hashed password, the login succeeds. Otherwise, an error message is shown.

All related routes (`/users/register`, `/users/registered`, `/users/list`, `/users/login`, `/users/loggedin`) were tested locally.

---

## Part B – Extension Tasks

### dotenv (Securing Database Credentials)
I installed and used the dotenv module to secure the database connection. I created a `.env` file to store:
- DB_HOST  
- DB_USER  
- DB_PASS  
- DB_NAME  

These values are accessed through `process.env` in `index.js`. The `.env` file is added to `.gitignore` to prevent it from being pushed to GitHub.

### Audit Logging
I created an `audit` table to store login activity. Each entry includes:
- username  
- login time  
- status (success or fail)

Login attempts are automatically logged, and I added the route `/users/audit` to display the history.

---

## Part D – Deployment and Default Access

I added the required default user in the `insert_test_data.sql` script:
- Username: gold  
- Password: smiths - in order to get this, I first find the hash of it which is "$2b$10$84aoRqZYKbgxcmWdg9L9OeaK3ILr1ZV8BwGEQ01nWQHFGo.0KX7/W"

The application was deployed on the VM and updated with the latest database changes. It is running using the following command:
forever start index.js
