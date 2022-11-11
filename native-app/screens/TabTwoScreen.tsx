import React from "react";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location"; //library used to get the location from the phone

export default function TabTwoScreen() {
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
          coordinate={currentLocation}>
          <View //is where we can style the marker
            style={{ backgroundColor: "red", borderRadius: 50, padding: 15 }}>
            <Text>You</Text>
          </View>
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
});
