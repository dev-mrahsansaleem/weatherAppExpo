import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../utils";

const Weather = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

  return (
    <View style={styles.info}>
      <Text style={[styles.capital, styles.textS]}>
        {data.name}, {data.sys.country}
      </Text>
      <Image style={styles.icon} source={{ uri: iconUrl }} />
      <Text style={styles.textP}>{(data.main.temp - 273).toFixed(1)}° C </Text>
      <Text style={[styles.capital, styles.textS]}>
        {data.weather[0].description}
      </Text>
    </View>
  );
};
export default Weather;

const styles = StyleSheet.create({
  info: { alignItems: "center" },
  capital: {
    textTransform: "capitalize",
    textAlign: "center",
  },
  icon: { width: 100, height: 100 },
  textP: { color: colors.PRIMARY, fontSize: 40 },
  textS: {
    color: colors.SECOUNDORY,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
