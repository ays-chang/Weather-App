// DATE AND TIME
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}  ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let timeStamp = document.querySelector("#result-date-time");
let now = new Date();
timeStamp.innerHTML = formatDate(now);
// END DATE AND TIME

// SEARCH LOCATION BAR
function searchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
  let city = document.querySelector("#result-city");
  if (searchInput.value == "") {
    alert("Please enter a city");
  } else {
    city.innerHTML = `${searchInput.value}`;
  }
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", searchInput);
// END SEARCH LOCATION BAR

// WEATHER FORECAST
function showForecast(response) {
  let resultForecast = document.querySelector("#forecast");
  resultForecast.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    resultForecast.innerHTML += `
    <div class="col-2">
      <h2 class="forecast-day">
        ${formatHours(forecast.dt * 1000)}
      </h2>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" class="forecast-icon" />
      <h3>
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong> 
          ${Math.round(forecast.main.temp_min)}°
      </h3>
    </div>
    `;
  }
}
// END WEATHER FORECAST

// WEATHER SEARCH RESULTS
function search(city) {
  let unit = "metric";
  let apiKey = "567bdd1a492b51ec8f3e522e5fb4d478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let city = response.data.name;
  let resultCity = document.querySelector("#result-city");
  resultCity.innerHTML = `${city}`;

  celciusTemperature = response.data.main.temp;

  let temperature = Math.round(celciusTemperature);
  let resultTemp = document.querySelector("#result-temperature");
  resultTemp.innerHTML = `${temperature}`;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  let weather = response.data.weather[0].main;
  let resultWeather = document.querySelector("#result-weather");
  resultWeather.innerHTML = `${weather}`;

  let humidity = response.data.main.humidity;
  let resultHumidity = document.querySelector("#result-humidity");
  resultHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let resultWind = document.querySelector("#result-wind");
  resultWind.innerHTML = `${wind}`;
}
// END WEATHER SEARCH RESULTS

// CELCIUS FAHRENHEIT CONVERSION
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitConvert = (celciusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#result-temperature");
  temperature.innerHTML = Math.round(fahrenheitConvert);
}

function showCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#result-temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);
// END CELCIUS FAHRENHEIT CONVERSION

// WEATHER GEOLOCATION API
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(requestPosition);
}

function requestPosition(position) {
  let unit = "metric";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "567bdd1a492b51ec8f3e522e5fb4d478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

let nowLocation = document.querySelector("#current-location");
nowLocation.addEventListener("click", currentPosition);
// END WEATHER GEOLOCATION API

search("Vancouver");
