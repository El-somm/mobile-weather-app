import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { geoApiOptions, GEO_API_URL } from "../../constants/api";

const Search = ({ onSearchChange }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${query}`,
        geoApiOptions
      );
      const result = await response.json();
      setSuggestions(result.data || []);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!input) {
      Alert.alert("Error", "Please enter a city name.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
        geoApiOptions
      );
      const result = await response.json();
      const city = result.data[0];

      if (city) {
        onSearchChange({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        });
        setSuggestions([]);
        Keyboard.dismiss(); // Close the keyboard
      } else {
        Alert.alert("No City Found", "Please try a different city.");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      Alert.alert("Error", "An error occurred while fetching city data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSuggestion = (city) => {
    setInput(city.name);
    onSearchChange({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    });
    setSuggestions([]);
    Keyboard.dismiss(); // Close the keyboard after selecting
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(input);
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout
  }, [input]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for city"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSearch} // Trigger search on "Enter"
      />
      <Button title="Search" onPress={handleSearch} />
      {loading && <Text style={styles.loadingText}>Loading...</Text>}
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectSuggestion(item)} style={styles.suggestionItem}>
            <Text style={styles.suggestionText}>{`${item.name}, ${item.countryCode}`}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading && suggestions.length === 0 && input.length > 0 ? (
            <Text style={styles.noResultsText}>No suggestions found.</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  loadingText: {
    textAlign: "center",
    color: "#888",
    marginBottom: 5,
  },
  noResultsText: {
    textAlign: "center",
    color: "#888",
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    backgroundColor: "#eee",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default Search;

