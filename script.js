// look at todos activity and week 5 3rd party apis
// in drink list 05.01.04, var that grabs the element and use jquery to append each 'card' to div
// 1. Search for city and display weather info
//      a. grab input on button click **
//      b. create function that intakes input**
//      c. display info
// i. current weather
// function that creates the div and populates info
// ii. 5 day forecast in cards
// 1. for loop that creates the card - html template literals, or create code based off jquery line by line
// 2. populate with data - look at docs for specific day - 2 diff API calls
// iii. grab weather object Name and send that name to local storage
// 2. save city name to local storage
// a. set (all inside function)
// i. function that has parameter (parameter is City/local storage name)
// ii. declare empty array
// iii. push name (city name) to array
// iv. set local storage
// b. get
// i. get info and parse it -> var storedTodos = JSON.parse(localStorage.getItem("todos"));
// ii. if statement and store that into the empty array -> if       (storedTodos !== null) {
// todos = storedTodos;
// }
// iii. render info to DOM and create onclick event, data attribute within our button that holds something specfific
// iv. empty div (with jquery, .empty()) and
// 3. search for saved city on click and display weather info

// 4**. clear local storage on click

function searchCity(searchInput) {
  // Constructing a queryURL using the name
  var apiKey = "&appid=4204ebef4f6e7d80cdfbbe2d12a641ee";

  var firstUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + apiKey;

  var result;

  // Performing an AJAX request with the queryURL
  $.ajax({ url: firstUrl, method: "GET" })
    .then(response => {
      result = response;
      var lat = response.coord.lat;
      var long = response.coord.lon;

      //   var secondUrl =
      //     "https://api.openweathermap.org/data/2.5/uvi?" +
      //     apiKey +
      //     "&lat=" +
      //     lat +
      //     "&lon=" +
      //     long;

      //   return $.ajax({ url: secondUrl, method: "GET" });
      // })
      // .then(response => {
      //   var uvi = response.value;
      // result.uvi = uvi;
      if ($("#weatherDiv").length) {
        var weatherDiv = $("#weatherDiv");
      } else {
        var weatherDiv = $("<div id='weatherDiv'></div>").appendTo(".card");
      }

      var city = result.name;
      var tempK = result.main.temp;
      var humidity = result.main.humidity;
      var wind = result.wind.speed;
      var icon = result.weather[0].icon;

      var iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      var iconElement = $("<img>");
      iconElement.attr("src", iconUrl);

      //   convert kelvin to f
      var num = (tempK * 9) / 5 - 459.67;
      var tempF = num.toFixed(1);

      weatherDiv.empty();
      weatherDiv.append(iconElement);
      weatherDiv.append(
        "<h1>" + city,
        "<p>" + "Temperature: " + tempF + " ºF",
        "<p>" + "Humidity: " + humidity + "%",
        "<p>" + "Wind Speed: " + wind + " MPH"
        // "<p>" + "UV Index: " + uvi
      );

      var fiveDayWeather =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        searchInput +
        apiKey;

      return $.ajax({
        url: fiveDayWeather,
        method: "GET"
      });
    })
    .then(function(response) {
      var list = response.list;
      var nextDayArray = [0, 8, 16, 24, 32];

      if ($("#forecastsDiv").length) {
        var forecastsDiv = $("#forecastsDiv");
      } else {
        var forecastsDiv = $("<div id='forecastsDiv'></div>").appendTo(
          "#weatherDiv"
        );
      }
      $("#forecastsDiv").append("<h1>" + "5 Day Weather Forecast: ");
      for (var i = 0; i < nextDayArray.length; i++) {
        var forecast = list[nextDayArray[i]];
        var tempK = forecast.main.temp;
        //   convert kelvin to f
        var num = (tempK * 9) / 5 - 459.67;
        var tempF = num.toFixed(1);
        var humidity = forecast.main.humidity;
        console.log(forecast);
        var icon = forecast.weather[0].icon;

        var iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        var iconElement = $("<img>");
        iconElement.attr("src", iconUrl);

        // weatherDiv.empty();

        // weatherDiv.append(
        //   "<p>" + "Wind Speed: " + wind + " MPH",
        //   "<p>" + "Temperature: " + tempF + " ºF",
        //   "<p>" + "UV Index: " + uvi
        // );

        // var temp = forecast.temp;
        console.log(i + 1, `<div id='forecast-${i + 1}' class='card'></div>`);
        $(
          `<div id='forecast-${i + 1}' class='card forecast-card'></div>`
        ).appendTo("#forecastsDiv");
        $(`#forecast-${i + 1}`).append(
          iconElement,
          "<p>" + "Temperature: " + tempF + "ºF",
          "<p>" + "Humidity: " + humidity + "%"
        );
      }
    });
}

$(".searchButton").on("click", function() {
  event.preventDefault();
  var searchInput = $("#searchBox")
    .val()
    .trim();
  searchCity(searchInput);
});
// toggle button
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});
