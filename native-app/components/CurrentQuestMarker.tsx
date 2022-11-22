import React from 'react';
import { View,  StyleSheet, Text, Image } from 'react-native';
import  {  Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { QuestProp } from '../types';

export function CurrentQuestMarker({quest}: QuestProp) {

    const navigation = useNavigation()

    const {latitude, longitude} = quest.location

    return (
        <Marker //marker is the pin on the map
          coordinate={{latitude, longitude}}
        anchor={{ x: 0.5, y: 0.5 }}
      style={{flex:1, justifyContent:'center', alignItems: 'center', height: 30, width: 28}}
      onPress={() => navigation.navigate('TabOne', {screen:'CurrentQuest'})}>
        <View>
        <Image source={require('../assets/images/marker.png')} style={{width:26, height:30 }} />
          </View>
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