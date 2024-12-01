
// import './App.css';
// import React, { useState } from 'react';
// import Search from './components/search/search';
// import Forecast from "./components/forecast/forecast";
// import CurrentWeather from './components/current-weather/current-weather';
// import { WEATHER_API_URL, WEATHER_API_KEY } from './api';

// function App() {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);

//   const handleOnSearchChange = (searchData) => {
//     const [lat, lon] = searchData.value.split(" ");

//     const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
//     const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

//     Promise.all([currentWeatherFetch, forecastFetch])
//       .then(async (response) => {
//         const weatherResponse = await response[0].json();
//         const forecastResponse = await response[1].json();

//         setCurrentWeather({ city: searchData.label, ...weatherResponse });
//         setForecast({ city: searchData.label, ...forecastResponse });
//       })
//       .catch((error) => console.log(error));
//   };

//   console.log(currentWeather);
//   console.log(forecast);

//   return (
//     <div className="container">
//       <Search onSearchChange={handleOnSearchChange} />
//       {currentWeather && <CurrentWeather data={currentWeather} />}
//       {forecast && <Forecast data={forecast} />} {/* Pass forecast data to Forecast component */}
//     </div>
//   );
// }

// export default App;

// App.js
import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Search from "./components/Search";
import Forecast from "./components/Forecast";
import CurrentWeather from "./components/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";

export default function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <Search onSearchChange={handleOnSearchChange} />
      <ScrollView>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});

// api.js
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "289cf15259msh43ebb8a1b83aa4ep192c6cjsn4ec1e8abd891",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "c341502851eb5525a04e84d2177a2dbb";

// components/CurrentWeather.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const CurrentWeather = ({ data }) => {
  return (
    <View style={styles.weather}>
      <View style={styles.top}>
        <View>
          <Text style={styles.city}>{data.city}</Text>
          <Text style={styles.description}>{data.weather[0].description}</Text>
        </View>
        <Image
          style={styles.icon}
          source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.temperature}>{Math.round(data.main.temp)}°C</Text>
        <View style={styles.details}>
          <Text>Feels like: {Math.round(data.main.feels_like)}°C</Text>
          <Text>Wind: {data.wind.speed} m/s</Text>
          <Text>Humidity: {data.main.humidity}%</Text>
          <Text>Pressure: {data.main.pressure} hPa</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weather: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  city: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  icon: {
    width: 50,
    height: 50,
  },
  bottom: {
    marginTop: 10,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
  },
  details: {
    marginTop: 10,
  },
});

export default CurrentWeather;

// components/Forecast.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));

  if (!data || !data.list) {
    return <Text>No forecast data available.</Text>;
  }

  return (
    <View>
      <Text style={styles.title}>7-Day Forecast</Text>
      {data.list.slice(0, 7).map((item, idx) => (
        <View key={idx} style={styles.dailyItem}>
          <Image
            style={styles.icon}
            source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
          />
          <Text style={styles.day}>{forecastDays[idx]}</Text>
          <Text style={styles.description}>{item.weather[0].description}</Text>
          <Text style={styles.minMax}>
            {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  dailyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  minMax: {
    fontSize: 14,
  },
});

export default Forecast;

// components/Search.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { geoApiOptions, GEO_API_URL } from "../api";

const Search = ({ onSearchChange }) => {
  const [input, setInput] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${input}`,
        geoApiOptions
      );
      const result = await response.json();
      const city = result.data[0];

      if (city) {
        onSearchChange({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        });
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for city"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Search" on