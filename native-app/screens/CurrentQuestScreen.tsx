import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { CurrentUser } from "../context/CurrentUser";
import * as Location from "expo-location";
import { locationChecker } from "../utils/functions";

export default function CurrentQuestScreen() {
  const navigation = useNavigation();

  const { currentUser, setCurrentUser } = useContext(CurrentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [arrived, setArrived] = useState("null");
  const [questStatus, setQuestStatus] = useState(false);

  const cancelQuest = () => {
    setCurrentUser({ ...currentUser, currentQuest: null });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync(); //asks the phone for permission to use location
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({}); //gets the last known location this is quicker than  requesting the current location the alternative is to use Location.getCurrentPositionAsync(options)
      if (location !== null) {
        setLocation(location);
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (questStatus) {
      //Congrats you've completed the quest
      setQuestStatus(null);
    }
  }, [questStatus]);

  const updateLocation = () => {
    (async () => {
      setIsLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync(); //asks the phone for permission to use location
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({}); //gets the last known location this is quicker than  requesting the current location the alternative is to use Location.getCurrentPositionAsync(options)
      if (location !== null) {
        setLocation(location);
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      }
      setArrived(
        locationChecker(currentUser.currentQuest.location, currentLocation, 3)
      );
      setIsLoading(false);
    })();
  };

  if (isLoading) return <Text>Loading</Text>;
  if (arrived === "true")
    return (
      <View style={styles.main}>
        <Text>You Have arrived</Text>
        <Text>Now complete the tasks at hand</Text>
        <View style={styles.container}>
          {currentUser.currentQuest.objectives.map((objective) => {
            return <Text key={objective.desc}>{objective.desc}</Text>;
          })}
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("CameraPage", { questStatus, setQuestStatus });
          }}
        >
          <Text>Submit Quest Update</Text>
        </Pressable>
      </View>
    );
  return (
    <View style={styles.main}>
      <Text style={styles.title}>{currentUser.currentQuest.title}</Text>
      <View style={styles.container}>
        <Text>{currentUser.currentQuest.category}</Text>
        <Text>Time Limit: {currentUser.currentQuest.time_limit_hours} hrs</Text>
      </View>
      <View style={styles.container}>
        <Text>
          {currentUser.currentQuest.rewards.coins} coins{" "}
          {currentUser.currentQuest.rewards.xp}XP
        </Text>
      </View>
      <View style={styles.container}>
        <Text>{currentUser.currentQuest.description}</Text>
      </View>
      <View style={styles.container}>
        {currentUser.currentQuest.objectives.map((objective) => {
          return <Text key={objective.desc}>{objective.desc}</Text>;
        })}
      </View>
      <View style={styles.buttonContainer}>
        {arrived === "false" ? (
          <Text style={styles.redText}>
            I don't think we are there yet, move around and check again
          </Text>
        ) : (
          <Text style={styles.blueText}>
            Adventurer press the button when you have arrived
          </Text>
        )}
        <Pressable onPress={updateLocation} style={[styles.button, styles.sos]}>
          <Text style={styles.buttonText}>Check Location</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.cancel]} onPress={cancelQuest}>
          <Text style={styles.buttonText}>Cancel Quest</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  main: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    margin: 20,
    width: "80%",
    backgroundColor: "green",
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sos: {
    backgroundColor: "green",
  },
  cancel: {
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
  },
  redText: {
    color: "red",
  },
  blueText: {
    color: "blue",
  },
});
