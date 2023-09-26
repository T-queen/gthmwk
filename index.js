let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function updateWeather(weatherData) {
  let cityNameElement = document.querySelector("#city-name");
  cityNameElement.textContent = weatherData.name;
  let timeElement = document.querySelector("#current-time");
  let currentDate = new Date(weatherData.dt * 1000);
  let dayOfWeek = days[currentDate.getDay()];
  timeElement.textContent =
    dayOfWeek + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
  let tempElement = document.querySelector(".temperature");
  tempElement.textContent = Math.round(weatherData.main.temp);
  // let celsiusLink = document.querySelector("#celsius-link");
  // let fahrenheitLink = document.querySelector("#fahrenheit-link");
  // celsiusLink.addEventListener("click", function () {
  //   tempElement.textContent = Math.round(weatherData.main.temp);
  // });
  // fahrenheitLink.addEventListener("click", function () {
  //   let fahrenheitTemp = (weatherData.main.temp * 9) / 5 + 32;
  //   tempElement.textContent = Math.round(fahrenheitTemp);
  // });
  let humidityElement = document.querySelector("#humidity");
  humidityElement.textContent = "Humidity: " + weatherData.main.humidity + "%";
}

function getWeatherData(city) {
  const apiKey = "c1881888cde715cf04a69f2477b4c3c3"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    updateWeather(response.data);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = searchInput.value.toLowerCase();
  if (city.trim() !== "") {
    getWeatherData(city);
    searchInput.value = "";
  }
}

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", handleFormSubmit);
