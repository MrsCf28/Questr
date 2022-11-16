import React, {useEffect} from 'react';
import { View, Pressable, StyleSheet, Text, Image } from 'react-native';
import MapView, { Callout, Marker } from "react-native-maps";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export function QuestMarker({quest}) {

    const navigation = useNavigation()

    const {latitude, longitude} = quest.location

    return (
        <Marker //marker is the pin on the map
          coordinate={{latitude, longitude}}
        anchor={{ x: 0.5, y: 0.5 }}
      style={{flex:1, justifyContent:'center', alignItems: 'center', height: 30, width: 28}}
      onPress={() => navigation.navigate("AcceptQuest", quest)}>
        <View>
        <Image source={require('../assets/images/marker.png')} style={{width:26, height:30 }} />
          </View>
          {/* <Callout style={styles.callout}
          onPress={() => navigation.navigate("AcceptQuest", quest)}>
            
            <View style={styles.marker}>
              <Text>{quest.title}</Text>
              <View style={styles.container}>
                <Text>{quest.category}</Text>
                <Text> Time Limit: {quest.time_limit_hours} hrs</Text>
              </View>
              <View style={styles.container}>
                <Text> {quest.rewards.coins} coins {quest.rewards.xp} XP</Text>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("AcceptQuest", quest)}
                >
                <Text style={styles.buttonText}>See Details</Text>
              </Pressable>
            </View>
          </Callout> */}
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
      zIndex: 3,
      elevation: 3
    },
    buttonText: {
      color:'white'
    },
    callout: {
      flex: 1,
      elevation: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });