import React from "react";
import { TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Text, View } from "../components/Themed";

type DSProps = {
  setPress: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function DisclaimerScreen({ setPress }: DSProps) {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/stones.jpg")}
        style={styles.container}
        resizeMode="cover">
        <ImageBackground
          source={require("../assets/images/bigScroll.png")}
          resizeMode="stretch"
          style={styles.scroll}>
          <View style={styles.holder}>

          
          <Text style={styles.title}>Warning</Text>
          <Text style={styles.text}>
            Please use this app at your own risk, be aware of your own safety
            and surroundings. Whilst we have worked our hardest to ensure that
            this app is as safe as posible we cannot be held resposible for any
            actions taken when using this app.{" "}
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text
              style={styles.buttonText}
              onPress={() => setPress(true)}>
              Accept Terms
            </Text>
          </TouchableOpacity>
          </View>
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
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "none",
  },
  button: {
    margin: 20,
    width: "80%",
    borderColor: "#7a7877",
    backgroundColor: "#014c54",
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  buttonText: {
    color: "white",
  },
  text: {
    padding: 40,
    fontSize: 20,
    textAlign: "center",
  },
  holder: {
    width: '80%',
    backgroundColor: 'none',
    textAlign: 'center',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
