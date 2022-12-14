import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { useEffect } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileController } from "./ProfileController";

export function ProfileData() {
  const [selectedTab, setSelectedTab] = useState<string>("stats");

  useEffect(() => {
    
  }, [selectedTab])

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/wood.jpg')} style={styles.container} resizeMode="cover">
        <ProfileInfo/>
        <ProfileController/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: 3,
  },
});
