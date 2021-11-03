import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const WEATHER_API_KEY = "d5f763d0081fb539d40c1801d2ced535";
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Rain: "rain",
  Thunderstorm: "lightning",
  Drizzle: "rains",
  Snow: "snow",
  Mist: "cloudy",
  Smoke: "cloudy",
  Haze: "cloudy",
  Dust: "cloudy",
  Fog: "cloudy",
  Sand: "cloudy",
  Ash: "cloudy",
  Squall: "cloudy",
  Tornado: "lightnings",
};

const Weather = () => {
  const [city, setCity] = useState("Loading...");
  const [day, setDay] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      {
        latitude,
        longitude,
      },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const json = await response.json();
    setDay(json);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.weather}>
      {!day ? (
        <View style={styles.day}>
          <ActivityIndicator size="large" style={{ marginTop: 30 }} />
        </View>
      ) : (
        <>
          <View style={styles.day}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.temp}>
                {parseFloat(day.main.temp).toFixed(1)}℃
              </Text>
            </View>
            <Text style={styles.cityName}>
              {city} is now in {day.weather[0].main.toLowerCase()}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  cityName: {
    fontSize: 14,
  },
  weather: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
  },
  day: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH,
    paddingTop: 10,
    marginBottom: -10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  temp: {
    fontSize: 10,
    marginLeft: 5,
  },
  activity: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
});
