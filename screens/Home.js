import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Weather from "../components/Weather";

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("Waiting..");
  const [weatherRes, setWeatherRes] = useState(null);

  const Load = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    console.log(loc);
    setLocation(loc);
    if (loc) {
      console.log("found");
      await getWeather();
    }
  };
  const getWeather = async () => {
    const key = "23f95c9bc4e2500d11fcec89dcef3d8f";
    axios
      .create({
        baseURL: "http://api.openweathermap.org/data/2.5/",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      })
      .get(
        "weather?lat=" +
          location.coords.latitude +
          "&lon=" +
          location.coords.longitude +
          "&appid=" +
          key
      )
      .then((res) => {
        setWeatherRes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Load();
  }, []);

  return weatherRes ? (
    <>
      <Weather data={weatherRes} />
    </>
  ) : (
    <>
      <View>
        <Text>{errorMsg}</Text>
      </View>
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
