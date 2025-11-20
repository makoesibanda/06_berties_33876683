-- Insert initial test data

USE berties_books;

-- Some default books to test with (from earlier labs)
INSERT INTO books (name, price)
VALUES
('Brighton Rock', 20.25),
('Brave New World', 25.00),
('Animal Farm', 12.99);

-- Default login user required for Lab 7 marking
-- Password is 'smiths' (hashed using bcrypt offline)
INSERT INTO users (username, first, last, email, hashedPassword)
VALUES
('gold', 'Default', 'User', 'test@gold.ac.uk', '$2b$10$84aoRqZYKbgxcmWdg9L9OeaK3ILr1ZV8BwGEQ01nWQHFGo.0KX7/W');

-- I didn’t add any audit data here because it gets populated automatically
-- when someone tries to log in
