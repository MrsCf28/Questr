import React from "react";
import { useState, useEffect, useContext } from "react";

import { StyleSheet, Text, View, Dimensions,} from "react-native";
import * as Location from "expo-location"; //library used to get the location from the phone

import { CurrentUser } from "../context/CurrentUser";
import CurrentQuestMap from "../components/CurrentQuestMap";
import AllQuestMap from "../components/AllQuestsMap";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

type Quest = {
  latitude: Float,
  longitude: Float,
  region: String
}

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

  const image = currentUser.image

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
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
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

  if(currentUser.current_quest_id === '0') {
    return <AllQuestMap currentLocation ={currentLocation} image={image}/>
  } else if (currentUser.current_quest_id !== '0') {
    return <CurrentQuestMap currentLocation ={currentLocation} image={image} currentQuestId={currentUser.current_quest_id}/>
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
