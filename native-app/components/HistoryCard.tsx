import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function HistoryCard({ quest }) {
  return (
    <View style={styles.container}>
      <Text>{quest.title}</Text>
      <Text>Completed: 10/11/2022</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 10,
    padding:10,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
  },
});