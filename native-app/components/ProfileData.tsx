import React, { useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { StatsScreen } from "./StatsScreen";
import { HistoryScreen } from "./HistoryScreen";
import { TabHolder } from "./TabHolder";
import { ItemsScreen } from "./ItemsScreen";
import { useEffect } from "react";
import { AvatarScreen } from "../screens/AvatarScreen";

export function ProfileData() {
  const [selectedTab, setSelectedTab] = useState<string>("stats");

  useEffect(() => {
    
  }, [selectedTab])

  return (
    <View style={styles.container}>
      <TabHolder selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <StatsScreen selectedTab={selectedTab} />
      <HistoryScreen selectedTab={selectedTab} />
      <ItemsScreen selectedTab={selectedTab} />
      <AvatarScreen selectedTab={selectedTab}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
});
