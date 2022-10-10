//fetch geo coordinates
//Initiate a variable for API key
var APIKey = "4368b1e17c090b1497239e040975304e";
var searchBoxEl = $("#city-name-input");
var searchBtnEl = $(".btn-primary");

searchBtnEl.on("click", function () {
  var city = searchBoxEl.val();
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          getCurrentDateForecast(data.coord.lon, data.coord.lat);
          getFiveDaysForecast(data.coord.lon, data.coord.lat);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Openweathermap");
    });
});

//create a function to fetch the current date weather forecast
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

//5-day weather forecast
//local storage
