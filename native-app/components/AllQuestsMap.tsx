import React from "react";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Pressable, Image } from "react-native";

import { QuestMarker } from "./QuestMarker";

export default function AllQuestMap ({currentLocation, quests, image}) {

  


  return (
    <View style={styles.container}>
      <MapView //mapview loads the base map
        style={styles.map}
        initialRegion={currentLocation}
        showsMyLocationButton={true}>
        <Marker //marker is the pin on the map
          coordinate={currentLocation}
          anchor={{ x: 0.5, y: 0.5 }}
          style={styles.marker}>
          <View //is where we can style the marker
            style={{ backgroundColor: "#014c54", borderRadius: 50, padding: 2 }}>
            <Image
              style={styles.image}
              source={{uri:image}}
            />
          </View>
        </Marker>
           {quests.map((quest) => {
          return (
            <QuestMarker
              key={quest.id}
              quest={quest}
            />
          );
        })}
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
  