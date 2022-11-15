import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function HistoryCard({ quest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >{quest.title}</Text>
      <Text style={styles.text} >Completed: 10/11/2022</Text>
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