import React from "react";
import { useState, useEffect, useContext } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Pressable, Image } from "react-native";
import * as Location from "expo-location"; //library used to get the location from the phone
import { QuestMarker } from "../components/QuestMarker";
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

  if(currentQuest === null) {
    return <AllQuestMap currentLocation ={currentLocation} image={image} quests={quests}/>
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
