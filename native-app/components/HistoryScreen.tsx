import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, ImageBackground } from "react-native";
import { HistoryCard } from "./HistoryCard";

interface tabProp {
  selectedTab: string;
}

export function HistoryScreen({ selectedTab }: tabProp) {
  const [completedQuests, setCompletedQuests] = useState([
    {
      cordinate: {
        latitude: 53.7958,
        longitude: -1.54535,
      },
      id: 1,
      title: "Slay a dragon",
      category: "adventure",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 100, coins: 10 },
      timeLimit: "1 hour",
      questObjectives: ["go to location", "slay dragon", "find gold"],
    },
    {
      cordinate: {
        latitude: 53.7102,
        longitude: -1.5012,
      },
      id: 2,
      title: "Defeat the wizard at checkers",
      category: "minigame",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 50, coins: 20 },
      timeLimit: "2 hour",
      questObjectives: ["find wizard", "play checkers", "win at checkers"],
    },
    {
      cordinate: {
        latitude: 53.7102,
        longitude: -1.5012,
      },
      id: 3,
      title: "Defeat the wizard at checkers",
      category: "minigame",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 50, coins: 20 },
      timeLimit: "2 hour",
      questObjectives: ["find wizard", "play checkers", "win at checkers"],
    },
    {
      cordinate: {
        latitude: 53.7102,
        longitude: -1.5012,
      },
      id: 4,
      title: "Defeat the wizard at checkers",
      category: "minigame",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 50, coins: 20 },
      timeLimit: "2 hour",
      questObjectives: ["find wizard", "play checkers", "win at checkers"],
    }, {
      cordinate: {
        latitude: 53.7102,
        longitude: -1.5012,
      },
      id: 5,
      title: "Defeat the wizard at checkers",
      category: "minigame",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 50, coins: 20 },
      timeLimit: "2 hour",
      questObjectives: ["find wizard", "play checkers", "win at checkers"],
    }, {
      cordinate: {
        latitude: 53.7102,
        longitude: -1.5012,
      },
      id: 6,
      title: "Defeat the wizard at checkers",
      category: "minigame",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 50, coins: 20 },
      timeLimit: "2 hour",
      questObjectives: ["find wizard", "play checkers", "win at checkers"],
    }
  ]);

  return (
    <View
      style={[
        styles.container,
      ]}>
      <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
      <View style={styles.separator}/>
      <ScrollView style={styles.scrollableArea}>
        {completedQuests.map((quest) => {
          return <HistoryCard key={quest.id} quest={quest} />;
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
