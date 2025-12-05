# Lab 9b – Providing APIs and Extensions

## Overview  
In this lab I created and provided my own **Web API** using Express and MySQL. The API allows book data from the database to be accessed in **JSON format** so that it can be used by other applications or developers.

This lab helped me understand how to build server-side APIs, work with query parameters, and return structured data instead of HTML pages.

---

## Creating the Books API  
I created a new `/api/books` route in my Express application. This route connects to the database and returns all books in **JSON format** instead of rendering an HTML view.

This helped me understand the difference between normal website routes and API routes that are designed for data access only.

---

## Adding a Search Feature  
I added a search feature to the API so that users can filter books by name using a query parameter. This allows specific books to be retrieved instead of always returning the full list.

This helped me understand how query parameters can be used to dynamically change API behaviour.

---

## Adding a Price Range Filter  
I added support for filtering books using a minimum and maximum price. This allows users to request only the books that fall within a specific price range.

This improved the flexibility of the API and showed how numerical filtering can be applied to database data.

---

## Adding Sorting Options  
I added a sort option so that the API results can be ordered either by **book name** or by **price**. This helps organise the returned data in a more meaningful way depending on the user’s needs.

This helped me understand how sorting works at the database query level.

---

## API Response Format  
All API requests return data in **JSON format**. This makes the API suitable for use with other applications, services, or front-end frameworks.

---

## Conclusion  
This lab helped me understand how to **provide my own Web API**, return structured JSON data from a database, and extend an API with searching, filtering, and sorting. I now understand how APIs are used to share data between systems and how they differ from standard website routes.
