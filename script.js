
const apiKey = "fe780c8f712d62f0142525fd58637a03";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector(".search-input input");
const searchBtn = document.querySelector(".search-button button");

const weatherIcon = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature");
const cityElement = document.querySelector(".city");
const humidityValueElement = document.querySelector(".humidity-value");
const windspeedValueElement = document.querySelector(".windspeed-value");



function updateWeatherVisuals(weatherId) {
    let icon = "❓";

    if (weatherId >= 200 && weatherId < 300) {
        icon = "⛈️";
    } else if (weatherId >= 300 && weatherId < 400) {
        icon = "🌧️"; 
    } else if (weatherId >= 500 && weatherId < 600) {
        icon = "☔"; 
    } else if (weatherId >= 600 && weatherId < 700) {
        icon = "❄️"; 
    } else if (weatherId >= 700 && weatherId < 800) {
        icon = "🌫️"; 
    } else if (weatherId === 800) {
        icon = "☀️"; 
    } else if (weatherId > 800) {
        icon = "☁️"; 
    }

    weatherIcon.textContent = icon;
}


async function checkWeather(city) {
    
    const url = apiUrl + city + `&appid=${apiKey}`;

    try {
        const response = await fetch(url);

        if (response.status === 404) {
            cityElement.textContent = "City Not Found";
            temperatureElement.textContent = "---";
            humidityValueElement.innerHTML = "💧--%";
            windspeedValueElement.innerHTML = "💨-- km/h";
            weatherIcon.textContent = "🤷";
            console.error("Error: City not found (404)");
            return;
        }

        const data = await response.json();

        temperatureElement.textContent = Math.round(data.main.temp) + "°C";
        cityElement.textContent = data.name;

        humidityValueElement.innerHTML = `💧${data.main.humidity}%`;
        windspeedValueElement.innerHTML = `💨${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h

        const weatherConditionId = data.weather[0].id;
        updateWeatherVisuals(weatherConditionId);

    } catch (error) {
        console.error("An error occurred during the fetch operation:", error);
        cityElement.textContent = "Connection Error";
        temperatureElement.textContent = "---";
        weatherIcon.textContent = "⚠️";
    }
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    }
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    }
});
document.addEventListener('DOMContentLoaded', () => {
    checkWeather("Bengaluru");
});
