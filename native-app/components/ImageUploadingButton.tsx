import * as React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";

type ImageUploadingButtonProps = {
  title: string;
  onPress: () => Promise<void>;
  icon: string;
  color: string;
};

export default function ImageUploadingButton({
  title,
  onPress,
  icon,
  color,
}: ImageUploadingButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={true} style={styles.button}>
      <Image
        source={require("../assets/videos/checkingImag.gif")}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 20,
    width: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 350,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
