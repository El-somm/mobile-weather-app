
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CurrentWeather = ({ data }) => {
  if (!data || !data.weather || data.weather.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Weather data is not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.weather}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.city}>{data.city}</Text>
          <Text style={styles.description}>{data.weather[0].description}</Text>
        </View>
        <Image
          style={styles.icon}
          source={{
            uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          }}
        />
      </View>
      <Text style={styles.temperature}>
        {Math.round(data.main.temp)}°C
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  weather: {
    padding: 16,
    alignItems: 'center',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  icon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default CurrentWeather;

