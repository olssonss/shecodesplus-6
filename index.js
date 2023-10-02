let now = new Date();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();

const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");

let weekLan = document.querySelector("#weeks");
weekLan.innerHTML = `${day}`;

let monthDate = document.querySelector("#date");
monthDate.innerHTML = `${month} ${date}`;

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${minutes}`;

let isMetric = true;

function changeMetric(event) {
  event.preventDefault();
  let metrics = document.querySelector("#fahrenheit");

  if (isMetric) {
    metrics.innerText = "19";
    isMetric = false;
  } else {
    metrics.innerText = "60°";
    isMetric = true;
  }
}

let metric = document.querySelector("#metrics");
metric.addEventListener("click", changeMetric);

let apiUrl;

function showPosition(position) {
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let changingTemp = document.querySelector("#fahrenheit");
  changingTemp.innerHTML = `${temperature}°C`;

  let maximum = Math.round(response.data.main.temp_max);
  let max = document.querySelector("#maxmin");
  max.innerHTML = `${maximum}°C`;

  let minimum = Math.round(response.data.main.temp_min);
  let min = document.querySelector("#minmax");
  min.innerHTML = `${minimum}°C`;

  let humidityNow = Math.round(response.data.main.humidity);
  let humidityToday = document.querySelector("#humidity");
  humidityToday.innerHTML = `${humidityNow}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windCall = document.querySelector("#wind");
  windCall.innerHTML = `${windSpeed} m/s`;

  let cityNew = response.data.name;
  let changeCity = document.querySelector("#city");
  changeCity.innerHTML = `${cityNew}`;
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function cityChanges(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#changing");
  let city = document.querySelector("#city");
  city.innerHTML = `${searchCity.value}`;

  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentLocation);

let citiesForm = document.querySelector("#format");
citiesForm.addEventListener("submit", cityChanges);
