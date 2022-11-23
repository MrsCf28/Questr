import * as React from "react";
import { StyleSheet, Image } from "react-native";


<<<<<<< HEAD
=======

>>>>>>> 5aa4a73b19fea53bbdcfcf271db2499b88b274b2
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
