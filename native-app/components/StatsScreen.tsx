import React from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { Graph } from "./Graph";


export function StatsScreen() {
  return (
    <View
      style={[
        styles.container,
      ]}>
      <ImageBackground source={require('../assets/images/scroll.png')} resizeMode="contain" style={styles.image}>
        <Graph />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: '100%',
    width: '100%',
  },
  hidden: {
    display: "none",
  },
});
