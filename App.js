import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";
import styled from "styled-components";
import handleCatch from "./catch";

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

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [day, setDay] = useState("");
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

  const handleCatch = () => {
    const randomNumber = Math.floor(Math.random() * 100);
    console.log(randomNumber);
    if (randomNumber >= 70) {
      return Alert.alert("Gottya! The Pokemon is now yours!");
    }
    return Alert.alert("Aww! It was so close! Try Again!");
  };

  return (
    <Container>
      <StatusBar style="auto" />
      <WeatherContainer>
        {!day ? (
          <View>
            <ActivityIndicator size="large" style={{ marginTop: 30 }} />
          </View>
        ) : (
          <>
            <DayContainer>
              <WeatherInfo>
                <WeatherIcon>
                  <Fontisto
                    name={icons[day.weather[0].main]}
                    size={32}
                    color="black"
                  />
                </WeatherIcon>
                <WeatherText>
                  {parseFloat(day.main.temp).toFixed(1)}℃
                </WeatherText>
              </WeatherInfo>
              <CityName>
                {city} is now in {day.weather[0].main.toLowerCase()}
              </CityName>
            </DayContainer>
          </>
        )}
      </WeatherContainer>
      <PokemonProfile>
        <PokemonImage
          source={{
            uri: "https://static.wikia.nocookie.net/pokemon/images/9/9f/%EC%9E%89%EC%96%B4%ED%82%B9_%EA%B3%B5%EC%8B%9D_%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png/revision/latest/scale-to-width-down/984?cb=20170405084654&path-prefix=ko",
          }}
        />
        <PokemonName>Magikarp / Water</PokemonName>
      </PokemonProfile>

      <MonsterBallContainer>
        <TouchableOpacity onPress={handleCatch}>
          <MonsterBallImage
            source={{
              uri: "http://gundamschool.co.kr/pics//web/product/big/765627001524712429_2506941.jpg",
            }}
          />
        </TouchableOpacity>
      </MonsterBallContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #ffc801;
`;
const WeatherContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-top: 10px;
`;
const DayContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: ${SCREEN_WIDTH};
  padding: 0 20px;
  margin: auto;
`;
const WeatherInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const WeatherIcon = styled.View``;
const WeatherText = styled.Text`
  font-size: 24px;
  margin-left: 5px;
`;
const CityName = styled.Text`
  font-size: 18px;
`;
const PokemonProfile = styled.View`
  flex: 4;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
const PokemonImage = styled.Image`
  border-radius: 50px;
  width: 200px;
  height: 200px;
`;
const PokemonName = styled.Text``;
const MonsterBallContainer = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
const MonsterBallImage = styled.Image`
  border-radius: 50px;
  width: 80px;
  height: 80px;
`;
