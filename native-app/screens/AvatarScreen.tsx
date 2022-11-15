import React from "react";
import { View, StyleSheet, Text } from "react-native";
interface tabProp {
  selectedTab: string;
}

export function AvatarScreen({ selectedTab }: tabProp) {
  return (
    <View
      style={[
        styles.container,
        selectedTab === "avatar" ? null : styles.hidden,
      ]}>
        <Text>AVATAR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    width: "100%",
    backgroundColor: '#8f8f8f',
    borderWidth: 3,
    borderColor: '#2e2a27',
    borderTopWidth: 0,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100,
    margin: 10,
  },
  hidden: {
    display: "none",
  },
});