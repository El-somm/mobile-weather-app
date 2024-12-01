// import React from "react";
// import {
//   Accordion,
//   AccordionItemHeading,
//   AccordionItem,
//   AccordionItemPanel,
//   AccordionItemButton,
// } from "react-accessible-accordion";
// import './forecast.css';

// const WEEK_DAYS = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday',
// ];

// const Forecast = ({ data }) => {
//   const dayInAWeek = new Date().getDay();
//   const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
//     WEEK_DAYS.slice(0, dayInAWeek)
//   );

//   if (!data || !data.list) {
//     return <div>No forecast data available.</div>; // Fallback UI
//   }

//   return (
//     <>
//       <label className="title">Daily</label>
//       <Accordion allowZeroExpanded>
//         {data.list.slice(0, 7).map((item, idx) => (
//           <AccordionItem key={idx}>
//             <AccordionItemHeading>
//               <AccordionItemButton>
//                 <div className="daily-item">
//                   <img
//                     alt="weather"
//                     className="icon-small"
//                     src={`icons/${item.weather[0].icon}.png`}
//                   />
//                   <label className="day">{forecastDays[idx]}</label>
//                   <label className="description">
//                     {item.weather[0].description}
//                   </label>
//                   <label className="min-max">
//                     {Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C
//                   </label>
//                 </div>
//               </AccordionItemButton>
//             </AccordionItemHeading>
//             <AccordionItemPanel>
//   <div className="daily-details-grid">
//     {[
//       { label: "Pressure", value: `${item.main.pressure} hPa` },
//       { label: "Humidity", value: `${item.main.humidity}%` },
//       { label: "Clouds", value: `${item.clouds.all}%` },
//       { label: "Wind Speed", value: `${item.wind.speed} m/s` },
//       { label: "Sea Level", value: `${item.main.sea_level} m` },
//       { label: "Feels Like", value: `${Math.round(item.main.feels_like)}°C` },
//     ].map((detail, index) => (
//       <div key={index} className="daily-details-grid-item">
//         <label>{detail.label}: </label>
//         <label>{detail.value}</label>
//       </div>
//     ))}
//   </div>
// </AccordionItemPanel>


//           </AccordionItem>
//         ))}
//         <AccordionItem />
//       </Accordion>
//     </>
//   );
// };

// export default Forecast;
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
