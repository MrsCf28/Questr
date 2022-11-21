import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, ScrollView, ImageBackground } from "react-native";
import { useRegisteredUser } from "../context/Context";
import { HistoryCard } from "./HistoryCard";

interface tabProp {
  selectedTab: string;
}

export function HistoryScreen({ selectedTab }: tabProp) {

  const { currentUser } = useRegisteredUser();
 
  const {quest_history: completedQuests } = currentUser
  
  return (
    <View
      style={[
        styles.container,
      ]}>
      <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
      <View style={styles.separator}/>
      <ScrollView style={styles.scrollableArea}>
        {completedQuests.map((quest) => {
          return <HistoryCard key={quest.start_time} quest={quest} />;
        })}
      </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  hidden: {
    display: "none",
  },
  scrollableArea: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    width: '80%',
  },
});
