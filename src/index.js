// DATE AND TIME
function updateTimestamp(currentDateTime) {
  let dayIndex = currentDateTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  let hour = currentDateTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = currentDateTime.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let formattedDate = `${day}  ${hour}:${minute}`;
  return formattedDate;
}

let timeStamp = document.querySelector("#result-date-time");
let now = new Date();
timeStamp.innerHTML = updateTimestamp(now);
// END DATE AND TIME

// SEARCH LOCATION BAR
function searchInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
  let city = document.querySelector("#result-city");
  city.innerHTML = `${searchInput.value}`;
}
// END SEARCH LOCATION BAR

// WEATHER SEARCH RESULTS
function search(city) {
  let unit = "metric";
  let apiKey = "567bdd1a492b51ec8f3e522e5fb4d478";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", searchInput);

function showWeather(response) {
  let city = response.data.name;
  let resultCity = document.querySelector("#result-city");
  resultCity.innerHTML = `${city}`;

  let temperature = Math.round(response.data.main.temp);
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

// FAHRENHEIT CONVERSION
function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitConvert = (10 * 9) / 5 + 32;
  let temperature = document.querySelector("#result-temperature");
  temperature.innerHTML = Math.round(fahrenheitConvert);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);
// END FAHRENHEIT CONVERSION

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
