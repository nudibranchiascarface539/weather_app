// ==============================================
//  Weather App - script.js
//  Author: Weather App Project
//  Description: Handles API calls, DOM updates,
//               loading states, and error handling
// ==============================================

// ---- STEP 1: CONFIGURATION ----
// Replace 'YOUR_API_KEY_HERE' with your actual OpenWeatherMap API key.
// Get a free key at: https://openweathermap.org/api
// ⚠️  IMPORTANT: Never commit your real API key to a public repository!

const API_KEY  = '724db465d760af324c5045dc459ceec1';           // <-- Put your API key here
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const UNITS    = 'metric';                        // 'metric' → Celsius, 'imperial' → Fahrenheit


// ---- STEP 2: DOM ELEMENT REFERENCES ----
// We grab all the HTML elements we'll need to read from or update.

// Input & Button
const cityInput       = document.getElementById('cityInput');
const searchBtn       = document.getElementById('searchBtn');

// Sections (shown/hidden based on state)
const loadingContainer  = document.getElementById('loadingContainer');
const errorContainer    = document.getElementById('errorContainer');
const weatherResult     = document.getElementById('weatherResult');
const welcomeScreen     = document.getElementById('welcomeScreen');

// Error message text
const errorMessage      = document.getElementById('errorMessage');

// Weather data display elements
const cityNameEl        = document.getElementById('cityName');
const countryNameEl     = document.getElementById('countryName');
const weatherDateEl     = document.getElementById('weatherDate');
const weatherIconEl     = document.getElementById('weatherIcon');
const temperatureEl     = document.getElementById('temperature');
const weatherDescEl     = document.getElementById('weatherDescription');
const humidityEl        = document.getElementById('humidity');
const windSpeedEl       = document.getElementById('windSpeed');
const feelsLikeEl       = document.getElementById('feelsLike');
const visibilityEl      = document.getElementById('visibility');


// ---- STEP 3: UI STATE MANAGEMENT ----
// These functions control which section is visible at any time.
// Only one section should be shown at a time.

/**
 * showLoading()
 * Hides all sections and shows the loading spinner.
 * Called immediately when the user submits a search.
 */
function showLoading() {
  welcomeScreen.classList.add('hidden');
  errorContainer.classList.remove('visible');
  weatherResult.classList.remove('visible');
  loadingContainer.classList.add('visible');
}

/**
 * showError(message)
 * Hides all sections and shows the error box with a custom message.
 * @param {string} message - The error text to display to the user
 */
function showError(message) {
  loadingContainer.classList.remove('visible');
  weatherResult.classList.remove('visible');
  welcomeScreen.classList.add('hidden');

  errorMessage.textContent = message;
  errorContainer.classList.add('visible');
}

/**
 * showWeather()
 * Hides all other sections and reveals the weather result card.
 * Called after successfully receiving and updating data from the API.
 */
function showWeather() {
  loadingContainer.classList.remove('visible');
  errorContainer.classList.remove('visible');
  welcomeScreen.classList.add('hidden');
  weatherResult.classList.add('visible');
}


// ---- STEP 4: HELPER FUNCTIONS ----

/**
 * formatDate(timestamp, timezone)
 * Converts a Unix timestamp + UTC offset into a human-readable date string.
 * Example output: "Sunday, 24 May 2026, 12:15 PM"
 *
 * @param {number} timestamp - Unix timestamp in seconds (from API)
 * @param {number} timezone  - UTC offset in seconds (from API)
 * @returns {string}
 */
function formatDate(timestamp, timezone) {
  // Convert timestamp to milliseconds and adjust for city's timezone
  const localTime = new Date((timestamp + timezone) * 1000);

  const options = {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
    hour:    '2-digit',
    minute:  '2-digit',
    timeZone: 'UTC'    // We've already applied the offset manually
  };

  return localTime.toLocaleDateString('en-US', options);
}

/**
 * getWeatherIconUrl(iconCode)
 * Builds the full URL for an OpenWeatherMap weather icon.
 * The API returns a code like "01d" (clear sky, day) or "10n" (rain, night).
 *
 * @param {string} iconCode - The icon code from the API response
 * @returns {string} - Full image URL
 */
function getWeatherIconUrl(iconCode) {
  // '@2x' gives us the higher-resolution (100x100) version of the icon
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * capitalizeFirstLetter(str)
 * Capitalizes the first letter of each word in a string.
 * Used for weather descriptions like "scattered clouds" → "Scattered Clouds"
 *
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}


// ---- STEP 5: MAIN API FUNCTION ----

/**
 * fetchWeather(city)
 * The core function of our app.
 * 1. Shows the loading spinner
 * 2. Makes a fetch() call to the OpenWeatherMap API
 * 3. Parses the JSON response
 * 4. Updates the DOM with weather data
 * 5. Handles errors gracefully
 *
 * @param {string} city - The city name entered by the user
 */
async function fetchWeather(city) {

  // Trim whitespace from the city name
  const cityName = city.trim();

  // Guard: don't fetch if the input is empty
  if (!cityName) {
    showError('Please enter a city name to search.');
    return;
  }

  // Show the loading animation immediately
  showLoading();

  try {
    // ---- BUILD THE API URL ----
    // We use encodeURIComponent to handle spaces and special characters in city names
    const url = `${BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=${UNITS}`;

    // ---- MAKE THE API CALL ----
    // fetch() returns a Promise; we await it to get the Response object
    const response = await fetch(url);

    // ---- HANDLE HTTP ERRORS ----
    // fetch() only rejects on network failure, not on 4xx/5xx HTTP errors.
    // We must check response.ok manually.
    if (!response.ok) {
      // 404 = City Not Found
      if (response.status === 404) {
        showError(`"${cityName}" was not found. Please check the spelling and try again.`);
      }
      // 401 = Invalid API Key
      else if (response.status === 401) {
        showError('Invalid API key. Please check your configuration.');
      }
      // Any other error
      else {
        showError(`Something went wrong (Error ${response.status}). Please try again.`);
      }
      return; // Stop execution
    }

    // ---- PARSE JSON ----
    // Convert the response body to a JavaScript object
    const data = await response.json();

    // ---- UPDATE THE UI WITH DATA ----
    updateWeatherUI(data);

  } catch (error) {
    // This catches network errors (e.g., no internet connection)
    console.error('Network Error:', error);
    showError('Unable to connect. Please check your internet connection and try again.');
  }
}


// ---- STEP 6: DOM UPDATE FUNCTION ----

/**
 * updateWeatherUI(data)
 * Takes the parsed API response object and updates every element in the DOM.
 * This separates data fetching (fetchWeather) from rendering (updateWeatherUI).
 *
 * @param {Object} data - The full JSON object returned by OpenWeatherMap API
 */
function updateWeatherUI(data) {

  // ---- EXTRACT DATA FROM API RESPONSE ----
  // The API response structure:
  // data.name              → City name
  // data.sys.country       → Country code (e.g., "IN", "US")
  // data.dt                → Unix timestamp
  // data.timezone          → UTC offset in seconds
  // data.weather[0].icon   → Icon code
  // data.weather[0].description → Weather condition
  // data.main.temp         → Temperature
  // data.main.feels_like   → Feels like temperature
  // data.main.humidity     → Humidity %
  // data.wind.speed        → Wind speed in m/s (metric)
  // data.visibility        → Visibility in meters

  const name        = data.name;
  const country     = data.sys.country;
  const timestamp   = data.dt;
  const timezone    = data.timezone;
  const icon        = data.weather[0].icon;
  const description = data.weather[0].description;
  const temp        = Math.round(data.main.temp);          // Round to nearest integer
  const feelsLike   = Math.round(data.main.feels_like);
  const humidity    = data.main.humidity;
  const windMs      = data.wind.speed;                     // Wind in meters/second
  const windKmh     = Math.round(windMs * 3.6);            // Convert m/s → km/h
  const visMeters   = data.visibility;
  const visKm       = (visMeters / 1000).toFixed(1);       // Convert m → km, 1 decimal

  // ---- UPDATE DOM ELEMENTS ----
  cityNameEl.textContent      = name;
  countryNameEl.textContent   = `📍 ${country}`;
  weatherDateEl.textContent   = formatDate(timestamp, timezone);
  weatherIconEl.src           = getWeatherIconUrl(icon);
  weatherIconEl.alt           = description;
  temperatureEl.textContent   = temp;
  weatherDescEl.textContent   = capitalizeFirstLetter(description);
  humidityEl.textContent      = `${humidity}%`;
  windSpeedEl.textContent     = `${windKmh} km/h`;
  feelsLikeEl.textContent     = `${feelsLike}°C`;
  visibilityEl.textContent    = `${visKm} km`;

  // ---- SHOW THE WEATHER SECTION ----
  showWeather();
}


// ---- STEP 7: EVENT LISTENERS ----
// These connect user interactions to our functions.

/**
 * Event: Click on search button
 * Reads the city input and calls fetchWeather()
 */
searchBtn.addEventListener('click', () => {
  fetchWeather(cityInput.value);
});

/**
 * Event: Press 'Enter' key while the input is focused
 * Same behavior as clicking the search button
 */
cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    fetchWeather(cityInput.value);
  }
});

/**
 * Event: Input changes (user types in the box)
 * Clears the error message while the user is typing a new city name.
 * This provides instant feedback and feels more responsive.
 */
cityInput.addEventListener('input', () => {
  // If there's an error showing and the user starts typing, hide the error
  if (errorContainer.classList.contains('visible')) {
    errorContainer.classList.remove('visible');
    welcomeScreen.classList.remove('hidden');
  }
});


// ---- STEP 8: INITIAL STATE ----
// Log a friendly message to the browser console for debugging
console.log('%c🌤️ WeatherNow App Loaded!', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
console.log('%cTo use this app, make sure to replace YOUR_API_KEY_HERE in script.js', 'color: #a855f7; font-size: 12px;');
