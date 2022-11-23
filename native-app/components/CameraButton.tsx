import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

type CameraButtonProps = {
  title: string;
  onPress: () => Promise<void>;
  icon: string;
  color: string;
};

export default function CameraButton({
  title,
  onPress,
  icon,
  color,
}: CameraButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>

      <Entypo
        name={icon}
        size={28}
        color={color ? color : "#f1f1f1"}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    borderRadius: 20,
  },
  icon: {
    padding: 20,
    borderColor: "white",
    backgroundColor: "#014c54",
    borderWidth: 3,
    overflow: "hidden",
    borderRadius: 38,
    margin: 10,
  },
});
