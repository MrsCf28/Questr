import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import {
  useNavigation,
  usePreventRemoveContext,
} from "@react-navigation/native";

export function ProfileController() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.text}> Sign out</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}>
        <Text style={styles.text}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 20,
  },
  button: {
    margin: 10,
    backgroundColor: "blue",
    padding: 10,
    color: "white",
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
