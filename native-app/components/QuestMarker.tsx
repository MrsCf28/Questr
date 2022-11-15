import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import MapView, { Callout, Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

export function QuestMarker({quest}) {

    const navigation = useNavigation()

    return (
        <Marker //marker is the pin on the map
          coordinate={quest.cordinate}
        anchor={{ x: 0.5, y: 0.5 }}
      style={{backgroundColor: 'blue'}}>
        <View>
          <Text style={{color:'white'}}>{quest.title}</Text>
          </View>
          <Callout onPress={() => navigation.navigate("AcceptQuest", quest)}>
            <View style={styles.marker}>
              <Text>{quest.title}</Text>
              <View style={styles.container}>
                <Text>{quest.category}</Text>
                <Text> Time Limit: {quest.timeLimit}</Text>
              </View>
              <View style={styles.container}>
                <Text> {quest.rewards.coins} coins {quest.rewards.xp} XP</Text>
              </View>
              <Pressable
                style={styles.button}
                >
                <Text style={styles.buttonText}>See Details</Text>
              </Pressable>
            </View>
          </Callout>
        </Marker>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    marker: {
      width: 200,
      height: 200,
      alignItems:'center'
    },
    button: {
      margin: 20,
      width: "80%",
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color:'white'
    }
  });