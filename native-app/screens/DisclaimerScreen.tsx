import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, ImageBackground } from "react-native";
import {
  useNavigation,
  usePreventRemoveContext,
} from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { RootNavigator } from "../navigation";

export default function DisclaimerScreen() {
  const [press, setPress] = useState(false);
  const navigation = useNavigation();
  if (press) {
    return <RootNavigator />;
  } else {
    return (
      <View style={styles.container}>
        <Text>Warning</Text>
        <Text>
          Please use this app at your own risk, be aware of your own saftey and
          surroundings. Whilst we have worked our hardest to ensure that this
          app is as safe as posible we cannot be held resposible for any actions
          taken when using this app.{" "}
        </Text>
        <Pressable style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => setPress(true)}>
            Go back
          </Text>
        </Pressable>
      </View>
    );
  }
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
  holder: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 120,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "none",
  },
  title: {
    fontSize: 20,
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
    textTransform: "capitalize",
    textAlign: "center",
  },
});
