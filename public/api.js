const api = `https://api.openweathermap.org/data/2.5/weather?q=Raleigh&appid=baf4140c60a58e66266f45db98479516`;

const a = 273;

axios.get(api)
  .then(function (response) {

    document.getElementById("temperature-value").innerText = `${Math.ceil(response.data.main.temp- a)}°C`
    document.getElementById("temperature-description").innerText = `${response.data.weather[0].description}`
    document.getElementById("location").innerText = `${response.data.name}`
    var el = document.getElementById("weather-icon");
    el.innerHTML = "<img src=\"https://openweathermap.org/img/wn/02d@2x.png\" >";
    
  })
  .catch(function (error) {
  })
  .finally(function () {
  });







