import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { geoApiOptions, GEO_API_URL } from "../../constants/api";
// 
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
      } else {
        console.error("No city found.");
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
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
});

export default Search;

// import React, { useState } from "react";
// import { AsyncPaginate } from "react-select-async-paginate";
// import { geoApiOptions, GEO_API_URL } from "../../api";

// const Search = ({ onSearchChange }) => {
//   const [search, setSearch] = useState(null);

//   const loadOptions = (inputValue) => {
//     return fetch(
//       `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
//       geoApiOptions
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         return {
//           options: response.data.map((city) => {
//             return {
//               value: `${city.latitude} ${city.longitude}`,
//               label: `${city.name}, ${city.countryCode}`,
//             };
//           }),
//         };
//       })
//       .catch((error) => {
//         console.error("Error fetching city data:", error);
//         return { options: [] };
//       });
//   };

//   const handleOnChange = (searchData) => {
//     setSearch(searchData);
//     onSearchChange(searchData);
//   };

//   return (
//     <AsyncPaginate
//       placeholder="Search for city"
//       debounceTimeout={600}
//       value={search}
//       onChange={handleOnChange}
//       loadOptions={loadOptions}
//     />
//   );
// };

// export default Search;
