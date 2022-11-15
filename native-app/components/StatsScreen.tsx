import React from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import { Graph } from "./Graph";
interface tabProp {
  selectedTab: string;
}

export function StatsScreen({ selectedTab }: tabProp) {
  return (
    <View
      style={[
        styles.container,
        selectedTab === "stats" ? null : styles.hidden,
      ]}>
      <ImageBackground source={require('../assets/images/scroll.png')} resizeMode="contain" style={styles.image}>
        <Graph />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
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
