// Constructing a queryURL using the name
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  90066 +
  "&appid=4204ebef4f6e7d80cdfbbe2d12a641ee";

// Performing an AJAX request with the queryURL
$.ajax({
  url: queryURL,
  method: "GET"
})
  // After data comes back from the request
  .then(function(response) {
    console.log(response);
  });
