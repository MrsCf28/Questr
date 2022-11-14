import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

interface tabProp {
  setSelectedTab: Function;
}

export function TabHolder({ setSelectedTab }: tabProp) {
  function toggleTab(input: string) {
    setSelectedTab(input);
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => toggleTab("history")}>
        <Text style={styles.text}>History</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => toggleTab("stats")}>
        <Text style={styles.text}>Stats</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => toggleTab("items")}>
        <Text style={styles.text}>Items</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => toggleTab("avatar")}>
        <Text style={styles.text}>Avatar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    color: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  text: {
    color: "white",
  },
});
