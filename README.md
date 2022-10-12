# weather-dashboard

## Description

Weather Dashboard is an application that allows a user to see the weather outlook for multiple cities
and plan a trip accordingly. The user is presented with both current weather conditions and a 5-day forecast, when searched for a city. This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

Openweather API will give a cross-origin (CORS) error. I have used the Heroku proxy.
Please enable the CORS here before accessing the deployed application https://cors-anywhere.herokuapp.com/

Here is the link to the [deployed application](https://shwethareddy0.github.io/weather-dashboard/)

### Features

- Fully Responsive
- Easy to modify
- Supports HTML5, CSS3 & JavaScript

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [License](#license)

## Installation

- Create a new repository on your GitHub account.
- Clone this repository to modify the files and images as required.
- Push your changes to your GitHub repository.
- Deploy to your preferred hosting service.

## Usage

This project can be used in any web browser or on any devices including the mobile devices.

The following image is the demo screenshot of the deployed application.

![Demo screenshot](./images/demo-weather-dashboard.gif)

Following is a code snippet of the application page.

Here the function getCurrentDateForecast() is used to fetch the current date weather forecast for the city.

```html5

function getCurrentDateForecast(lon, lat) {
  var currentDateQueryURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(currentDateQueryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          $("#currentDateForecast h2").text(
            data.name + moment().format(" (MM/DD/YYYY) ")
          );
          $("#currentDateForecast img").attr(
            "src",
            "http://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              "@2x.png"
          );
          $("#currentDateForecast span.temp").text(data.main.temp);
          $("#currentDateForecast span.wind").text(data.wind.speed);
          $("#currentDateForecast span.humidity").text(data.main.humidity);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Openweathermap");
    });
}


```

## Technologies Used

- HTML5
- CSS3
- JavaScript
- jQuery
- Moment.js
- Bootstrap
- Server-Side APIs
- Git
- GitHub
- GitHub Pages

## Credits

- MDN / W3Schools
- Stack Overflow
- Openweathermap

## License

This project is licensed under the [MIT](./LICENSE) license.
