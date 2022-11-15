import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
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
  ]);

  return (
    <View
      style={[
        styles.container,
        selectedTab === "history" ? null : styles.hidden,
      ]}>
      <ScrollView style={styles.scrollableArea}>
        {completedQuests.map((quest) => {
          return <HistoryCard key={quest.id} quest={quest} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
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
});
