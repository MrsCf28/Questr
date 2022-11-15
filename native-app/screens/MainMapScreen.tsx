import React from "react";
import { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Pressable, Image } from "react-native";
import * as Location from "expo-location"; //library used to get the location from the phone
import { useNavigation } from "@react-navigation/native";
import { QuestMarker } from "../components/QuestMarker";

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [quests, setQuests] = useState([
    {
      cordinate: {
        latitude: 53.7958,
        longitude: -1.54535,
      },
      id: 1,
      title: "Slay a dragon",
      category: "adventure",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 100, coins: 10 },
      timeLimit: "1 hour",
      questObjectives: ["go to location", "slay dragon", "find gold"],
    },
    {
      cordinate: {
        latitude: 53.7102,
        longitude: -1.5012,
      },
      id: 2,
      title: "Defeat the wizard at checkers",
      category: "minigame",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 50, coins: 20 },
      timeLimit: "2 hour",
      questObjectives: ["find wizard", "play checkers", "win at checkers"],
    },
    {
      cordinate: {
        latitude: 53.5102,
        longitude: -1.5012,
      },
      id: 3,
      title: "Find the Goblin",
      category: "hunt",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 50, coins: 20 },
      timeLimit: "2 hour",
      questObjectives: ["find wizard", "play checkers", "win at checkers"],
    },
    {
      cordinate: {
        latitude: 53.7102,
        longitude: -1.4012,
      },
      id: 4,
      title: "Drink all the Mead",
      category: "minigame",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 50, coins: 20 },
      timeLimit: "2 hour",
      questObjectives: ["find wizard", "play checkers", "win at checkers"],
    },
    {
      cordinate: {
        latitude: 53.796,
        longitude: -1.5454,
      },
      id: 5,
      title: "Save the Damsel",
      category: "adventure",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquam libero quis ipsum fringilla pretium. Cras condimentum augue",
      rewards: { xp: 100, coins: 10 },
      timeLimit: "1 hour",
      questObjectives: ["go to location", "slay dragon", "find gold"],
    },
  ]);

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
          anchor={{ x: 0.5, y: 0.5 }}
          style={styles.marker}>
          <View //is where we can style the marker
            style={{ backgroundColor: "red", borderRadius: 50, padding: 2 }}>
            <Image
              style={styles.image}
              source={{ uri: "https://picsum.photos/200/300" }}
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
    width: 50,
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: "white",
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
});
