import React from "react";
import { Text, View, StyleSheet } from "react-native";

//will need to format date to some thing actually readable

export function HistoryCard({ quest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >{quest.quest_title}</Text>
      <Text style={styles.text} >Completed: {quest.start_time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 10,
    padding:10,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#7a7877',
    backgroundColor: "#291403",
  },
  text: {
    color: 'white'
  }
});