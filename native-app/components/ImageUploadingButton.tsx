import * as React from "react";
import { StyleSheet, Image } from "react-native";

export default function ImageUploadingButton() {
  return (
    <Image
      source={require("../assets/videos/checkingImag.gif")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    margin: -200,
    height: 400,
    flexDirection: "column",
    width: 350,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
