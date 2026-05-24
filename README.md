# 🌤️ WeatherNow - Real-Time Weather App

A beautiful, beginner-friendly Weather App built with **HTML**, **CSS**, and **JavaScript** that fetches real-time weather data using the **OpenWeatherMap API**.

---

## 📸 Preview

> A modern glassmorphism UI with animated background, loading spinner, and a responsive stats grid.

---

## ✨ Features

- 🔍 **City Search** — Search weather for any city worldwide
- 🌡️ **Temperature** — Displays current temperature in Celsius
- 🌦️ **Weather Condition** — Shows condition with icon (e.g., Partly Cloudy)
- 💧 **Humidity** — Relative humidity percentage
- 💨 **Wind Speed** — Wind speed in km/h
- 🌡️ **Feels Like** — Apparent temperature
- 👁️ **Visibility** — Visibility range in km
- ❌ **Error Handling** — Friendly messages for invalid cities or network issues
- ⏳ **Loading Animation** — Spinner shown while data is being fetched
- 📱 **Fully Responsive** — Works perfectly on mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Technology     | Purpose                         |
|----------------|---------------------------------|
| HTML5          | Page structure & semantics      |
| CSS3           | Styling, animations, layout     |
| JavaScript ES6 | Logic, Fetch API, DOM updates   |
| OpenWeatherMap | Real-time weather data source   |
| Google Fonts   | Inter font for modern typography|

---

## 📁 Project Structure

```
weather-app/
├── index.html       ← Main HTML structure
├── style.css        ← All styling (glassmorphism, animations)
├── script.js        ← JavaScript logic (API, DOM updates)
├── README.md        ← This file
└── screenshot.png   ← App preview image
```

---

## 🚀 Getting Started

### 1. Clone or Download the Repository

```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

Or simply download the ZIP and extract it.

---

### 2. Get Your Free OpenWeatherMap API Key

1. Go to [https://openweathermap.org/](https://openweathermap.org/)
2. Click **Sign Up** (it's free!)
3. After signing in, go to **API keys** tab
4. Copy your default API key (or generate a new one)

> ⚠️ **Note:** New API keys may take **10–15 minutes** to activate after creation.

---

### 3. Add Your API Key

Open `script.js` and replace `YOUR_API_KEY_HERE` with your actual key:

```js
// script.js — Line 16
const API_KEY = 'your_actual_api_key_goes_here';
```

---

### 4. Open the App

Simply open `index.html` in your browser — **no server or build tools required!**

```
Double-click index.html → Opens in your default browser
```

Or use VS Code's **Live Server** extension for auto-reload on save.

---

## 💻 How It Works

```
User types city → Clicks Search (or presses Enter)
       ↓
   showLoading() → Spinner appears
       ↓
   fetch(API URL) → HTTP GET to OpenWeatherMap
       ↓
   response.ok?
   ├── NO  → showError("City not found")
   └── YES → Parse JSON → updateWeatherUI(data)
                              ↓
                         showWeather() → Display results
```

---

## 🔌 API Reference

This app uses the **OpenWeatherMap Current Weather Data** endpoint:

```
GET https://api.openweathermap.org/data/2.5/weather
    ?q={city name}
    &appid={API key}
    &units=metric
```

**Key Response Fields Used:**

| Field                    | Description              |
|--------------------------|--------------------------|
| `data.name`              | City name                |
| `data.sys.country`       | Country code (e.g., IN)  |
| `data.main.temp`         | Temperature in °C        |
| `data.main.feels_like`   | Feels like temperature   |
| `data.main.humidity`     | Humidity %               |
| `data.wind.speed`        | Wind speed in m/s        |
| `data.visibility`        | Visibility in meters     |
| `data.weather[0].icon`   | Icon code for image URL  |
| `data.weather[0].description` | Condition text      |

---

## 🎨 Design Highlights

- **Glassmorphism** — Translucent card with `backdrop-filter: blur()`
- **Gradient Background** — Deep space palette with animated floating blobs
- **Gradient Text** — Logo and temperature use CSS gradient text
- **Micro-animations** — Icon pulse, card entrance, stat-card hover lift
- **Loading Spinner** — Dual-color spinning ring with blink text
- **Shake Animation** — Error box shakes on appearance for feedback

---

## ⚙️ Customization

### Change Temperature Units
In `script.js`, change `'metric'` to `'imperial'` for Fahrenheit:
```js
const UNITS = 'imperial';   // Fahrenheit
```
Then update labels in `index.html` from `°C` to `°F`.

### Change Color Theme
In `style.css`, edit the CSS variables under `:root`:
```css
:root {
  --gradient-start: #0f0c29;   /* Change to your preferred colors */
  --accent-cyan: #06b6d4;
  --accent-purple: #a855f7;
}
```

---

## 🐛 Troubleshooting

| Problem                        | Solution                                               |
|-------------------------------|--------------------------------------------------------|
| "Invalid API key" error        | Wait 10-15 min after creating key; double-check key    |
| City not found                 | Check spelling; try adding country (e.g., "London, UK")|
| No data appears                | Open browser Console (F12) → check for error messages  |
| Icons not loading              | Check internet; icon URLs need OpenWeatherMap CDN      |

---

## 📝 Code Comments Guide

The code is thoroughly commented for beginners:
- Each **function** has a JSDoc comment explaining what it does
- **API response fields** are documented with what they mean
- **CSS classes** explain when they are shown/hidden
- **Error handling** is explained step by step

---

## 🔒 Security Note

> ⚠️ **Never commit your API key to a public GitHub repository!**

For a public project, consider:
- Using a backend proxy to hide the key
- Using environment variables with a build tool
- Adding `.env` file to `.gitignore`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/) for the free weather API
- [Google Fonts](https://fonts.google.com/) for the Inter typeface
- Design inspired by modern glassmorphism UI trends

---

## 👨‍💻 Author

**Weather App Project**
- Built as a beginner-friendly demonstration of HTML, CSS, and JavaScript

---

*Happy Coding! 🚀 Feel free to ⭐ star this repository if you found it helpful.*
