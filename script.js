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
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + apiKey;

  // UV index

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request, renders data to page
    .then(function(response) {
      console.log(response);

      //   get uv index - come back to this ************
      //   $.ajax({
      //     url: uvIndex,
      //     method: "GET"
      //   });

      //   var uvIndex =
      //     "https://api.openweathermap.org/data/2.5/uvi?" +
      //     apiKey +
      //     "&lat=" +
      //     response.coord.lat +
      //     "&lon=" +
      //     response.coord.lon;

      $("<div id=weatherDiv></div>").appendTo(".card");
      var city = response.name;
      var tempK = response.main.temp;
      var humidity = response.main.humidity;
      var wind = response.wind.speed;

      //   convert kelvin to f
      var num = (tempK * 9) / 5 - 459.67;
      var tempF = num.toFixed(1);

      $("#weatherDiv").empty();
      $("#weatherDiv").append(
        "<h1>" + city,
        "<p>" + "Temperature: " + tempF + " ºF",
        "<p>" + "Humidity: " + humidity + "%",
        "<p>" + "Wind Speed: " + wind + " MPH"
        // "<p>" + uvIndex
      );
      $("<div class=card id=5dayCard></div>").appendTo("#weatherDiv");
      $("#5dayCard").append("</h1>" + "5-Day Forecast: ");
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
