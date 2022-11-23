import * as React from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

type ImageMatchProps = {
  onPress: () => Promise<void>;
};

export default function ImageMatch({ onPress }: ImageMatchProps) {
  return (
    <View>
      <Text>Thees eyes have laid upon the target</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Image
          source={require("../assets/videos/coins.gif")}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../assets/images/stones.jpg")}
        style={styles.main}
        resizeMode="cover"
      >
        <View style={styles.holder}>
          <View style={styles.container}></View>

          <View style={styles.container}></View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={Camera}>
              <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    borderColor: "#7a7877",
    backgroundColor: "#014c54",
    borderWidth: 3,
    overflow: "hidden",
    borderRadius: 38,
    margin: 10,
  },
  image: {
    height: 40,
    flexDirection: "column",
    width: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
