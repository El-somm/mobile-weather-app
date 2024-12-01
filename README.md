Weather App React

This is a weather application built with React that allows users to view current weather data, including temperature, humidity, wind speed, and more. The app fetches data from the OpenWeather API and displays it in a user-friendly interface.

Features

	•	Displays current weather conditions based on the user’s city of choice.
	•	Shows weather details such as temperature, humidity, wind speed, and pressure.
	•	Weather icons representing the current weather condition.

Getting Started

To get this project up and running on your local machine, follow these instructions:

Prerequisites

Before you begin, make sure you have the following installed:

	•	Node.js (Recommended version: 14.x or higher)
	•	npm (comes with Node.js)

Clone the Repository

Clone this repository to your local machine and navigate to the project directory.

Install Dependencies

Run the appropriate command to install all dependencies for the project.
Npm i
npm i react-accessible-accordion
npm i react-select-async-paginate

Get API Keys

OpenWeather API

	1.	Go to OpenWeather API website.
	2.	Sign up for a free account or log in if you already have one.
	3.	After logging in, generate an API key for the “Current Weather Data” API.
	4.	Copy your API key.

GeoDB API (for city search)

	1.	Go to GeoDB API on RapidAPI.
	2.	Sign up or log in to your account.
	3.	Subscribe to the “GeoDB Cities” API.
	4.	Copy your API key.

Set Up Environment Variables

Create a .env file in the root of the project and add the following lines:

	•	OPENWEATHER_API_KEY=your_openweather_api_key
	•	GEODB_API_KEY=your_geodb_api_key

Replace your_openweather_api_key and your_geodb_api_key with the actual API keys you copied earlier.

Run the App

Once the dependencies are installed you can start the app. It will run in development mode, accessible via your browser.

Build the App

To build the app for production, generate an optimized production build. This will create a build/ folder that contains the optimized assets.


Code Organization

The app is organized into the following main folders:

	•	src/ - Contains all the React components, hooks, and application logic.
	•	components/ - Includes the React components for displaying weather data.
	•	api/ - Contains API functions for fetching weather data from OpenWeather and GeoDB.
	•	public/ - Contains the public-facing files, such as index.html.
	•	styles/ - Contains global and component-specific CSS.

# mobile-weather-app
