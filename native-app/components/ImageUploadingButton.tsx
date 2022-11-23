import * as React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

type ImageUploadingButtonProps = {
  title: string;
  onPress: () => Promise<void>;
  icon: string;
  color: string;
};

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
