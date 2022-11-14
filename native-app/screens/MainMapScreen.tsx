import React from "react";
import { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import * as Location from "expo-location"; //library used to get the location from the phone
import { useNavigation } from "@react-navigation/native";


export default function TabTwoScreen() {
  const navigation = useNavigation()
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

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
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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

  return (
    <View style={styles.container}>
      <MapView //mapview loads the base map
        style={styles.map}
        initialRegion={currentLocation}
        showsMyLocationButton={true}>
        <Marker //marker is the pin on the map
          coordinate={currentLocation}
          anchor={{ x: 0.5, y: 0.5 }}>
          <View //is where we can style the marker
            style={{ backgroundColor: "red", borderRadius: 50, padding: 5 }}>
            <Text>You</Text>
          </View>
        </Marker>
        <Marker //marker is the pin on the map
          coordinate={{
            latitude: 53.7958,
            longitude: -1.54535,
          }}
          anchor={{ x: 0.5, y: 0.5 }}>
          <View //is where we can style the marker
            style={{ backgroundColor: "green", borderRadius: 50, padding: 5 }}>
            <Text>Quest</Text>
          </View>
          <Callout>
            <View style={styles.marker}>
              <Text>Slay Dragon</Text>
              <View style={styles.container}>
                <Text> Adventure</Text>
                <Text> Time Limit: 1hr</Text>
              </View>
              <View style={styles.container}>
                <Text> 10 coins 100XP</Text>
              </View>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("AcceptQuest")}>
                <Text style={styles.buttonText}>See Details</Text>
              </Pressable>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
