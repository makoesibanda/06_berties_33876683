# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price)VALUES('Brighton Rock', 20.25),('Brave New World', 25.00), ('Animal Farm', 12.99) ;

INSERT INTO users (username, first, last, email, hashedPassword)
VALUES ('gold', 'Default', 'User', 'test@gold.ac.uk', '$2b$10$84aoRqZYKbgxcmWdg9L9OeaK3ILr1ZV8BwGEQ01nWQHFGo.0KX7/W');


