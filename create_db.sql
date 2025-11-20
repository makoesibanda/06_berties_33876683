-- Lab 7 – Setting up database tables
-- This file creates the database and tables we need for the Berties Books app

-- I start by creating the database (only if it's not already there)
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

-- Table for books (this has been here from previous labs)
CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    price DECIMAL(5,2)
);

-- New users table (added in Lab 7 for registration + password hashing)
-- hashedPassword stores the bcrypt-hashed value, not the real password
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first VARCHAR(50),
    last VARCHAR(50),
    email VARCHAR(100),
    hashedPassword VARCHAR(255)
);

-- Table used for audit logging (tracks all login attempts)
-- This helps us to record both successful and failed logins
CREATE TABLE IF NOT EXISTS audit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    loginTime DATETIME,
    status VARCHAR(10)   -- 'success' or 'fail'
);

-- Note: User creation and privileges have been removed here
-- because they caused errors on the VM. The .env file handles DB access.
