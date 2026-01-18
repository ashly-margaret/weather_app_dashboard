# Weather Now 🌤️

A beautiful, responsive, and dynamic weather application built with Next.js and Tailwind CSS. **Weather Now** provides real-time weather updates, detailed forecasts, and immersive background animations that reflect the current sky conditions.

## ✨ Features

- **Real-time Weather Data**: Get current temperature, "feels like", humidity, wind speed, and precipitation.
- **Dynamic Backgrounds**: Immersive, animated backgrounds that change based on weather conditions (Sunny, Rainy, Snowy, Cloudy, Stormy).
- **Hourly & Daily Forecasts**: Explore the weather for the next 24 hours and the upcoming week.
- **Day Selection**: Filter hourly forecasts by selecting a specific day from the daily list.
- **Smart Search**: Search for any city worldwide with instant results and a "Search in progress" indicator.
- **Unit Conversion**: Toggle between Celsius/Fahrenheit, km/h/mph, and mm/in measurements.
- **Responsive Design**: Fully optimized UI that adapts seamlessly from mobile devices to large desktop screens.
- **Robust Error Handling**: Friendly UI states for API errors and empty search results.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: Custom SVG & WebP assets
- **Font**: Standard Sans-Serif (Geist/Inter compatible)

## 📡 API Endpoints

This project uses the free and open-source **Open-Meteo API** for weather data and geocoding. No API key is required.

### 1. Weather Data (Forecast)

Fetches current, hourly, and daily weather data.

- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **Method**: `GET`
- **Parameters**:
  - `latitude`, `longitude`: Coordinates of the location.
  - `current`: `temperature_2m`, `relative_humidity_2m`, `apparent_temperature`, `precipitation`, `weather_code`, `wind_speed_10m`
  - `hourly`: `temperature_2m`, `weather_code`
  - `daily`: `weather_code`, `temperature_2m_max`, `temperature_2m_min`
  - `timezone`: `auto`

### 2. Geocoding (Search)

Searches for locations by name.

- **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
- **Method**: `GET`
- **Parameters**:
  - `name`: City name to search for.
  - `count`: Number of results (default 10).
  - `language`: `en`
  - `format`: `json`

## 🚀 Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/weather-now.git
    cd weather-now
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  **Open in your browser**:
    Visit [http://localhost:3000](http://localhost:3000) to see the app in action.

## 🎨 Credits

Designed and developed with a focus on simplicity and user experience.

---

_Built with ❤️ by [Ashly Margaret]_
