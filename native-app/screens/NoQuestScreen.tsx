import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function NoQuestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Not on a Quest</Text>
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
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
