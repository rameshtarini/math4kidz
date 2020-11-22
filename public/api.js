const api = `https://api.weather.gov/gridpoints/RAH/73,57/forecast`;



axios.get(api)
  .then(function (response) {
    
    document.getElementById("temperature-value").innerText = `${(response.data.properties.periods[0].temperature)}°F`
    document.getElementById("temperature-description").innerText = `${response.data.properties.periods[0].detailedForecast}`
    document.getElementById("location").innerText = `Raleigh, NC`
    var el = document.getElementById("weather-icon");
    el.innerHTML = "<img src=\"https://api.weather.gov/icons/land/day/bkn?size=medium\" >";
    
  })
  .catch(function (error) {
  })
  .finally(function () {
  });







