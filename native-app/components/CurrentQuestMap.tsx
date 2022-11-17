import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Pressable, Image } from "react-native";
import { fetchQuestById } from "../utils/questApi";

import { CurrentQuestMarker } from "./CurrentQuestMarker";


export default function CurrentQuestMap ({currentLocation, currentQuestId, image}) {

    const [currentQuest, setCurrentQuest] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setIsLoading(true)
      fetchQuestById(currentQuestId).then((quest) => {
        setCurrentQuest(quest);
        setIsLoading(false)
      })
    }, [currentQuestId])

    if(isLoading) return <Text>Loading</Text>
    return (
        <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={currentLocation}
          showsMyLocationButton={true}>
          <Marker
            coordinate={currentLocation}
            anchor={{ x: 0.5, y: 0.5 }}
            style={styles.marker}>
            <View
              style={{ backgroundColor: "#014c54", borderRadius: 50, padding: 2 }}>
              <Image
                style={styles.image}
                source={{uri:image}}
              />
            </View>
          </Marker>
              <CurrentQuestMarker
                quest={currentQuest}
              />
                    <Polyline
          coordinates={[currentLocation, {latitude: currentQuest.location.latitude, longitude: currentQuest.location.longitude}]}
          strokeColor={"#000"}
          strokeWidth={3}
          lineDashPattern={[1]}
        />
        </MapView>
      </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
    marker: {
      width: 50,
      height: 50,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: 30,
      width: 30,
      borderRadius: 50,
    },
  });
  