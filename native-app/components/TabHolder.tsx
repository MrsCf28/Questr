import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

interface tabProp {
  setSelectedTab: Function;
  selectedTab: string;
}

export function TabHolder({ selectedTab,setSelectedTab }: tabProp) {

  function toggleTab(input: string) {
    setSelectedTab(input);
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, selectedTab === 'history'? styles.active : null]}
        onPress={() => toggleTab("history")}>
        <Text style={styles.text}>History</Text>
      </Pressable>
      <Pressable
        style={[styles.button, selectedTab === 'stats' ? styles.active : null]}
        onPress={() => toggleTab("stats")}>
        <Text style={styles.text}>Stats</Text>
      </Pressable>
      <Pressable
        style={[styles.button, selectedTab === 'items' ? styles.active : null]}
        onPress={() => toggleTab("items")}>
        <Text style={styles.text}>Items</Text>
      </Pressable>
      <Pressable
        style={[styles.button, selectedTab === 'avatar' ? styles.active : null]}
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#014c54",
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: '#7a7877',
    borderRadius: 20,
    elevation: 2,
    zIndex: 2,
  },
  text: {
    color: "white",
  },
  active: {
    backgroundColor: "#02b9cc",
  }
});
