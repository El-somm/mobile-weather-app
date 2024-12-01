// import React from "react";
// import "./current-weather.css";

// const CurrentWeather = ({ data }) => {
//   return (
//     <div className="weather">
//       <div className="top">
//         <div>
//           <p className="city">{data.city}</p>
//           <p className="weather-description">{data.weather[0].description}</p>
//         </div>
//         <img
//           alt="weather"
//           className="weather-icon"
//           src={`icons/${data.weather[0].icon}.png`}
//         />
//       </div>
//       <div className="bottom">
//         <p className="temperature">{Math.round(data.main.temp)}°C</p>
//         <div className="details">
//           <div className="parameter-row">
//             <span className="parameter-label">Details</span>
//           </div>
//           <div className="parameter-row">
//             <span className="parameter-label">Feels like</span>
//             <span className="parameter-value">
//               {Math.round(data.main.feels_like)}°C
//             </span>
//           </div>
//           <div className="parameter-row">
//             <span className="parameter-label">Wind</span>
//             <span className="parameter-value">{data.wind.speed} m/s</span>
//           </div>
//           <div className="parameter-row">
//             <span className="parameter-label">Humidity</span>
//             <span className="parameter-value">{data.main.humidity}%</span>
//           </div>
//           <div className="parameter-row">
//             <span className="parameter-label">Pressure</span>
//             <span className="parameter-value">{data.main.pressure} hPa</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CurrentWeather;
// 
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
