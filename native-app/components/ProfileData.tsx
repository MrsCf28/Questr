import React, { useState } from "react";
import { View, Pressable, StyleSheet, Text, ImageBackground } from "react-native";
import { StatsScreen } from "./StatsScreen";
import { HistoryScreen } from "./HistoryScreen";
import { TabHolder } from "./TabHolder";
import { ItemsScreen } from "./ItemsScreen";
import { useEffect } from "react";
import { AvatarScreen } from "../screens/AvatarScreen";
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
