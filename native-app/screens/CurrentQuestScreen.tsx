import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Linking,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { Text, View } from "../components/Themed";
import * as Location from "expo-location";
import { locationChecker } from "../utils/functions";
import { fetchQuestById } from "../utils/questApi";
import { patchUser } from "../utils/userApi";
import { useCurrentUser, useRegisteredUser } from "../context/Context";
import { initialQuest } from "../utils/initialStates";

export default function CurrentQuestScreen() {
  const { setCurrentUser } = useCurrentUser();
  const { currentUser } = useRegisteredUser();
  const navigation = useNavigation();
  const [currentQuest, setCurrentQuest] = useState(initialQuest);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [arrived, setArrived] = useState("null");

  function cancelQuest() {
    const updatedUser = {
      id: currentUser.id,
      current_quest_id: "0",
    };

    patchUser(updatedUser)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err: any) => {
        console.log("error in patch user", err);
      });
    navigation.navigate("TabTwo");
  }

  function openPhone() {
    Linking.openURL(`tel: 99`);
  }
  useEffect(() => {
    setIsLoading(true);
    fetchQuestById(currentUser.current_quest_id)
      .then((quest) => {
        setCurrentQuest(quest);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

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
      setArrived(locationChecker(currentQuest.location, currentLocation, 3));
      setIsLoading(false);
      if (
        locationChecker(currentQuest.location, currentLocation, 3) === "true"
      ) {
        navigation.navigate("ActiveQuestScreen", currentQuest);
      }
    })();
  };

  if (isLoading) {
    return (
      <View style={styles.loadContainer}>
        <Image
          style={styles.imageLoading}
          source={require("../assets/videos/loadingScroll.gif")}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.main}>
        <ImageBackground
          source={require("../assets/images/stones.jpg")}
          style={styles.container}
          resizeMode="cover"
        >
          <ImageBackground
            source={require("../assets/images/bigScroll.png")}
            resizeMode="cover"
            style={styles.scroll}
          >
            <View style={styles.holder}>
              <Text                  onPress={() =>
                    navigation.navigate("ActiveQuestScreen", currentQuest)
                  } style={styles.title}>{currentQuest.title}</Text>
              <View style={styles.container}>
                <Text style={styles.text}>
                  Quest Type: {currentQuest.category}
                </Text>
                <Text>Time Limit: {currentQuest.time_limit_hours} hrs</Text>
              </View>
              <View style={styles.container}>
                <Text>
                  {currentQuest.rewards.coins} Coins {currentQuest.rewards.xp}{" "}
                  XP
                </Text>
              </View>
              <View style={styles.container}>
                <Text style={styles.text}>{currentQuest.description}</Text>
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

                <TouchableOpacity
                  onPress={updateLocation}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Check Location</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.cancel]}
                  onPress={cancelQuest}
                >
                  <Text style={styles.buttonText}>Cancel Quest</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.sos]}
                  onPress={() => openPhone()}
                >
                  <Text style={styles.buttonText}>SOS</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "none",
  },
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  holder: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 90,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "none",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "none",
  },
  button: {
    margin: 10,
    width: "80%",
    borderColor: "#7a7877",
    backgroundColor: "#014c54",
    borderWidth: 3,
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#4a040c",
  },
  sos: {
    backgroundColor: "#c20202",
  },
  buttonText: {
    color: "white",
  },
  redText: {
    color: "#c20202",
    textAlign: "center",
  },
  blueText: {
    color: "blue",
    textAlign: "center",
  },
  text: {
    textTransform: "capitalize",
    textAlign: "center",
  },
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLoading: {
    borderColor: "black",
    flex: 1,
    width: "100%",
  },
});
