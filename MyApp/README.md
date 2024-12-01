# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

Weather App

A mobile-friendly weather application built with React Native and Expo. This app displays current weather conditions, a 7-day forecast, and allows users to search for cities dynamically. The app utilizes APIs to provide accurate weather data.

Features

	•	Display current weather with temperature, condition, and icons.
	•	View a 7-day weather forecast.
	•	Search for cities dynamically with suggestions.
	•	Fully responsive and optimized for mobile devices.
	•	Dark and light mode support.

Table of Contents

	1.	Installation
	2.	Usage
	3.	APIs Used
	4.	File Structure
	5.	Available Scripts
	6.	Contributing
	7.	License

Installation

Prerequisites

	1.	Ensure you have Node.js installed on your system.
	2.	Install Expo CLI globally if not already installed.
	3.	Ensure Git is installed on your system.

Steps to Install

	1.	Clone the repository and navigate to the project directory.
	2.	Install all dependencies.
	3.	Create a .env file in the root of the project and add your API keys:
	•	GEO_API_KEY
	•	WEATHER_API_KEY
	4.	Start the development server and follow the instructions to run the app on an emulator, simulator, or physical device.

Usage

	1.	Search for cities using the search bar. Suggestions will appear dynamically as you type.
	2.	View current weather details like temperature, condition, and weather icon for the selected city.
	3.	Scroll through the 7-day forecast to see daily temperature ranges and weather conditions.
	4.	The app automatically adjusts its theme based on your system settings.

APIs Used

	1.	GeoDB API: Provides city search and population data.
	2.	OpenWeather API: Provides current weather and 7-day forecast data.

File Structure

weather-app/
├── assets/                Static assets like fonts and images
├── components/            Reusable components (e.g., Search, CurrentWeather, Forecast)
│   ├── search/            Search bar with suggestions
│   ├── current-weather/   Displays current weather conditions
│   └── forecast/          Displays 7-day weather forecast
├── constants/             API keys, URLs, and reusable constants
├── hooks/                 Custom hooks (e.g., useColorScheme)
├── App.js                 Main application entry point
├── app.config.js          Expo configuration
└── README.md              Project documentation
