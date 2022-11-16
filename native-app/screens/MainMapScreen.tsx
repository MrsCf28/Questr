import React from "react";
import { useState, useEffect, useContext } from "react";

import { StyleSheet, Text, View, Dimensions,} from "react-native";
import * as Location from "expo-location"; //library used to get the location from the phone

import { CurrentUser } from "../context/CurrentUser";
import CurrentQuestMap from "../components/CurrentQuestMap";
import AllQuestMap from "../components/AllQuestsMap";

export default function TabTwoScreen() {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const {currentUser} = useContext(CurrentUser)

  const {image, currentQuest} = currentUser

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); //asks the phone for permission to use location
      if (status !== "granted") {
        return;
      }
      let location = await Location.getLastKnownPositionAsync({}); //gets the last known location this is quicker than  requesting the current location the alternative is to use Location.getCurrentPositionAsync(options)
      if (location !== null) {
        setLocation(location);
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }

      setLoading(false);
    })();
  }, [location]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if(currentQuest === null) {
    return <AllQuestMap currentLocation ={currentLocation} image={image}/>
  } else if (currentQuest !== null) {
    return <CurrentQuestMap currentLocation ={currentLocation} image={image} currentQuest={currentQuest}/>
  }
  else return <Text>Something Went Wrong</Text>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
