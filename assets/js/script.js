//fetch geo coordinates for the city.
//Initiate a variable for API key
var APIKey = "4368b1e17c090b1497239e040975304e";

//Initiate  variables for input text box and search button.
var searchBoxEl = $("#city-name-input");
var searchBtnEl = $(".btn-primary");

showCityNamesFromLocalStorage();

//create a function to display the weather forecast of the city when clicked on search button.
function handleSearchClick() {
  var city = searchBoxEl.val();
  storeCityName(city);
  retrieveWeatherData(city);
}
//Retrieve the coordinates from the weather API.
function retrieveWeatherData(city) {
  // openweather API will give us a cross-origin (CORS) error. Used the Heroku proxy.
  var queryURL =
    "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" +
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
}

searchBtnEl.on("click", handleSearchClick);

//create a function to fetch the current date weather forecast.
function getCurrentDateForecast(lon, lat) {
  // openweather API will give us a cross-origin (CORS) error. Used the Heroku proxy.
  var currentDateQueryURL =
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?lat=" +
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
//create a function to fetch the 5 Days weather forecast.
function getFiveDaysForecast(lon, lat) {
  // openweather API will give us a cross-origin (CORS) error. Used the Heroku proxy.
  var fiveDaysForecastQueryURL =
    "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(fiveDaysForecastQueryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          var day1 = moment().add(1, "days").format("YYYY-MM-DD 15:00:00");
          var day2 = moment().add(2, "days").format("YYYY-MM-DD 15:00:00");
          var day3 = moment().add(3, "days").format("YYYY-MM-DD 15:00:00");
          var day4 = moment().add(4, "days").format("YYYY-MM-DD 15:00:00");
          var day5 = moment().add(5, "days").format("YYYY-MM-DD 15:00:00");
          const fiveDaysArr = [5];
          data.list.forEach(function (listItem) {
            if (listItem.dt_txt == day1) {
              fiveDaysArr[0] = listItem;
            } else if (listItem.dt_txt == day2) {
              fiveDaysArr[1] = listItem;
            } else if (listItem.dt_txt == day3) {
              fiveDaysArr[2] = listItem;
            } else if (listItem.dt_txt == day4) {
              fiveDaysArr[3] = listItem;
            } else if (listItem.dt_txt == day5) {
              fiveDaysArr[4] = listItem;
            }
          });
          console.log(fiveDaysArr);
          $("#fiveDaysForecast > div").each(function (index, divEl) {
            $(this)
              .find("h4")
              .text(
                moment()
                  .add(index + 1, "days")
                  .format("MM/DD/YYYY")
              );
            $(this)
              .find("img")
              .attr(
                "src",
                "http://openweathermap.org/img/wn/" +
                  fiveDaysArr[index].weather[0].icon +
                  "@2x.png"
              );
            $(this).find(".temp").text(fiveDaysArr[index].main.temp);
            $(this).find(".wind").text(fiveDaysArr[index].wind.speed);
            $(this).find(".humidity").text(fiveDaysArr[index].main.humidity);
          });
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Openweathermap");
    });
}

//local storage

//read the data localstorage
function storeCityName(city) {
  var weatherCities = JSON.parse(localStorage.getItem("weather-Cities"));
  if (weatherCities == null) {
    weatherCities = [city];
    localStorage.setItem("weather-Cities", JSON.stringify(weatherCities));
  } else {
    weatherCities.push(city);
    localStorage.setItem("weather-Cities", JSON.stringify(weatherCities));
  }
  showCityNamesFromLocalStorage();
}

//function for local storage, creating elemet Div and appending it.
function showCityNamesFromLocalStorage() {
  var weatherCities = JSON.parse(localStorage.getItem("weather-Cities"));
  var citiesListEl = $(".citieslist");
  citiesListEl.empty();
  if (weatherCities === null) {
    return;
  } else {
    for (var i = 0; i < weatherCities.length; i++) {
      var cityBtn = $("<button>");
      cityBtn.text(weatherCities[i]);
      cityBtn.addClass("btn btn-secondary mb-3 w-100");
      cityBtn.on("click", handleCityBtnClick);
      citiesListEl.append(cityBtn);
    }
  }
}
//when clicked on city button, the weather forecast data is retrieved for that city.
function handleCityBtnClick(event) {
  retrieveWeatherData(event.currentTarget.innerText);
}
