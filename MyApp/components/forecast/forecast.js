

import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Forecast</Text>
      <FlatList
        data={data.list.slice(0, 7)} // Limit to 7 days
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.dailyItem}>
            <Image
              style={styles.icon}
              source={{
                uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
              }}
            />
            <Text style={styles.day}>{forecastDays[index]}</Text>
            <Text style={styles.description}>{item.weather[0].description}</Text>
            <Text style={styles.minMax}>
              {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  dailyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    elevation: 3, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  day: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1, // Allow it to grow or shrink
    minWidth: 80, // Ensures day stays on one line
    flexShrink: 0, // Prevent shrinking
    textAlign: "left",
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    flex: 2, // Center the description
  },
  minMax: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    flex: 1, // Aligns temperature data on the right
  },
});

export default Forecast;