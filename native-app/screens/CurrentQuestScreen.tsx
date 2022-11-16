import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, ImageBackground } from "react-native";
import { Text, View } from "../components/Themed";
import { CurrentUser } from "../context/CurrentUser";
import * as Location from "expo-location";
import { locationChecker } from "../utils/functions";


export default function CurrentQuestScreen() {
  const navigation = useNavigation();

  const { currentUser, setCurrentUser } = useContext(CurrentUser);
  const [isLoading, setIsLoading] = useState(true)
  const [location, setLocation] = useState({});
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [arrived, setArrived] = useState('null')

  const cancelQuest = () => {
    setCurrentUser({ ...currentUser, currentQuest: null });
    navigation.navigate('TabTwo')
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true)
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
  }, [])

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
        setArrived(locationChecker(currentUser.currentQuest.location, currentLocation, 3))
        setIsLoading(false);
      })();
    };

  
  if(isLoading) return <Text>Loading</Text>
  if(arrived==='true') return (
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
            navigation.navigate("CameraPage");
          }}
        >
          <Text>Submit Quest Update</Text>
    </Pressable>
  </View>
  )
  return (
    <View style={styles.main}>
      <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
        <ImageBackground source={require('../assets/images/bigScroll.png')} resizeMode="cover" style={styles.scroll}>
          <View style={styles.holder}>
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
              {arrived==='false'? <Text style={styles.redText}>I don't think we are there yet, move around and check again</Text> : <Text style={styles.blueText}>Adventurer press the button when you have arrived</Text>}
              <Pressable onPress={updateLocation} style={[styles.button, styles.sos, ]}>
                <Text style={styles.buttonText}>Check Location</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.cancel]} onPress={cancelQuest}>
                <Text style={styles.buttonText}>Cancel Quest</Text>
              </Pressable>
            </View>
          </View> 
        </ImageBackground>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: "100%",
    justifyContent: 'center',
    backgroundColor: 'none'
  },
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  holder: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 120,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'none'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: 'none'
  },
  button: {
    margin: 20,
    width: "80%",
    borderColor: '#7a7877',
    backgroundColor: '#014c54',
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
  buttonText: {
    color: "white",
  },
  redText: {
    color: 'red'
  },
  blueText: {
    color: 'blue',
  }
});
