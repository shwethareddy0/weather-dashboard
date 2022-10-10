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
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Openweathermap");
    });
});

//create a function to fetch the current date weatehr forecast

//current date weather forecast
//5-day weather forecast
//local storage
