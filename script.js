// Select DOM elements
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.querySelector(".weather-info");
const cityName = document.getElementById("city-name");
const dateTime = document.getElementById("date-time");
const weatherIcon = document.getElementById("weather-icon");
const currentTemp = document.getElementById("current-temp");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feels-like");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind-speed"); // Added for wind speed
const forecastItems = document.getElementById("forecast-items");

const API_KEY = "1c537c244dc55e060257de7c71df2427"; // Replace with your OpenWeatherMap API key

// Event listener for button click
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value;

  if (city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          displayWeatherData(data);
        } else {
          alert("City not found.");
        }
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data.");
      });
  } else {
    alert("Please enter a city name.");
  }
});

// Function to display weather data
function displayWeatherData(data) {
  weatherInfo.style.display = "block";
  cityName.textContent = data.name;
  dateTime.textContent = new Date().toLocaleString();

  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.src = iconUrl;

  currentTemp.textContent = data.main.temp + "°C";
  description.textContent = data.weather[0].description;

  // Added details
  feelsLike.textContent = "Feels Like: " + data.main.feels_like + "°C";
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  wind.textContent = "Wind: " + data.wind.speed + " m/s"; // Display wind speed

  // Corrected forecast display with added logging:
  console.log("Forecast data:", data.daily); // Log forecast data for examination
  forecastItems.innerHTML = "";
  data.daily.slice(0, 5).forEach(forecast => {
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");
    forecastItem.innerHTML = `
      <img src="${iconUrl}" alt="${forecast.weather[0].description}">
      <p class="day">${new Date(forecast.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}</p>
      <p class="temp">${forecast.temp.day}°C</p>
    `;
    forecastItems.appendChild(forecastItem);
  });
  console.log("Forecast HTML:", forecastItems.innerHTML); // Log generated HTML for debugging
}
