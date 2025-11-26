# Lab 8a – Authorisation

## Overview
This lab focused on implementing session-based authorisation in the Bertie’s Books web application. I introduced session management using the `express-session` module and restricted access to selected routes so that only logged-in users can view sensitive content or interact with database-driven features. This builds on top of the login system created in Lab 7.

---


---

## Protected Routes

I restricted access to specific routes so that only authenticated users can access them:

### Users module
- `/users/list` – now only accessible once logged in  
- `/users/audit` – also protected to prevent unauthorised access  
- `/users/login` and `/users/register` remain public

### Books module
- `/books/list` – protected as it shows the complete list of available books  
- `/books/addbook` – protected to prevent unauthorised addition of books  
- `/books/bookadded` – protected after form submission

### Publicly accessible pages
- `/books/search`  
- `/books/search-result`  
- `/books/bargainbooks`

I tested the behaviour both logged in and logged out. When logged out, protected routes redirect to the login page. Once logged in, they become accessible as expected.

---

## Logout Feature
I added a logout route which clears the session. Once logged out, attempting to access any protected route redirects back to the login page. A logout link was also added to the home page for better usability.

---


## Summary
This lab successfully introduced secure session-based access control into the application. Only authenticated users can access key routes such as book listing and audit history, while general content remains openly available. The logout function ensures active sessions can be terminated properly, further improving user control and security.
