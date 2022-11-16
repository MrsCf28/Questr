import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View } from '../components/Themed';

export default function NoQuestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are not on a Quest</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
