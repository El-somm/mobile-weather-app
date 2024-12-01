import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';


import Search from '@/components/search/search';
import CurrentWeather from '@/components/current-weather/current-weather';
import Forecast from '@/components/forecast/forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from '@/constants/api';

export default function HomeScreen() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (data: { value: string; label: string }) => {
    const [lat, lon] = data.value.split(' ');

    try {
      // Fetch current weather data
      const weatherResponse = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      // Fetch forecast data
      const forecastResponse = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastData = await forecastResponse.json();

      if (weatherData && forecastData) {
        setCurrentWeather({ city: data.label, ...weatherData });
        setForecast({ city: data.label, ...forecastData });
      } else {
        Alert.alert('Error', 'Unable to fetch weather data. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      Alert.alert('Error', 'Something went wrong while fetching data.');
    }
  };

  return (
    <View style={styles.container}>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather ? (
        <CurrentWeather data={currentWeather} />
      ) : (
        <Text style={styles.placeholder}>Search for a city to see the weather.</Text>
      )}
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Text style={styles.placeholder}>Forecast data will appear here.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  placeholder: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#888',
  },
});

