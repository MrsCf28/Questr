import { StyleSheet, ImageBackground } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";

export default function NoQuestScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/stones.jpg")}
        style={styles.container}
        resizeMode="cover">
        <ImageBackground
          source={require("../assets/images/bigScroll.png")}
          resizeMode="cover"
          style={styles.scroll}>
          <Text style={styles.title}>You are not on a Quest</Text>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "none",
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
