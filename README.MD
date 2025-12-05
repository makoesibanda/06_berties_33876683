# Lab 9 – Calling Web APIs and Error Handling

## Overview  
In this lab I connected my Express application to the **OpenWeather API** to display live weather data. Users can enter a city name and view real-time weather information inside the app.

This lab helped me understand how to call external APIs, work with JSON data, add interactivity using forms, improve the design using CSS, and apply error handling.

---

## Calling the OpenWeather API  
I first tested the OpenWeather API in the browser using my API key. The API returned a JSON response containing temperature, humidity, wind speed and weather description, confirming that the API was working correctly.

---

## Displaying Weather Data  
I added a `/weather` route to my Express application and used the `request` module to fetch live weather data. I extracted and displayed the following information:
- **Temperature**
- **Humidity**
- **Wind speed**
- **Weather description**

The data is shown in a readable format instead of raw JSON.

---

## Adding Interactivity  
I added a form so users can enter their own city name. The city is sent to the server using a GET request and the live weather for that city is displayed on the page.

---

## Improving the Design  
I used CSS to improve the appearance of the weather output by adding:
- Better font size  
- Improved colours  
- A styled layout for the results  

---

## Error Handling  
When a non-existent city is entered, the application checks if valid weather data exists. If not, it displays **“No data found”** instead of crashing.

---

## Conclusion  
This lab gave me practical experience in using Web APIs inside an Express application. I learned how to fetch live data, process JSON responses, improve the user interface, and safely handle invalid user input.
