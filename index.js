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
  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  celsiusLink.addEventListener("click", function () {
    tempElement.textContent = Math.round(weatherData.main.temp);
  });
  fahrenheitLink.addEventListener("click", function () {
    let fahrenheitTemp = (weatherData.main.temp * 9) / 5 + 32;
    tempElement.textContent = Math.round(fahrenheitTemp);
  });
  let humidityElement = document.createElement("li");
  humidityElement.textContent = "Humidity: " + weatherData.main.humidity + "%";
  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = "";
  conditionElement.appendChild(humidityElement);
}

function getWeatherData(latitude, longitude) {
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825"; // Replace with your OpenWeatherMap API key
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(function (response) {
      updateWeather(response.data);
    })
    .catch(function (error) {
      alert("Error fetching weather data. Please try again.");
    });
}

function handleButtonClicked() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeatherData(latitude, longitude);
      },
      function (error) {
        alert("Error getting current location. Please try again.");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", handleButtonClicked);

let searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value.trim();
  if (city !== "") {
    getWeatherData(null, null); // Fetch weather data for current location
    document.querySelector("h1").textContent = city;
    cityInput.value = "";
  }
});
