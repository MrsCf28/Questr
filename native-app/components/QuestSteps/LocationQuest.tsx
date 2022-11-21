import React, { useState, useEffect, useContext } from "react";
import MapView, { Callout, Marker, Polyline, } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Pressable, Image } from "react-native";
import * as Location from "expo-location"; //library used to get the location from the phone
import { locationChecker } from "../../utils/functions";

import {
  useNavigation,
} from "@react-navigation/native";
import { useRegisteredUser } from "../../context/Context";


export default function LocationQuest ({currentStep, questStepNo, setQuestStepNo}) {

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true)
    const [questCordinate, setQuestCordinate] = useState({latitude: Number(currentStep.endpoint[0]), longitude: Number(currentStep.endpoint[1])})
    const [location, setLocation] = useState({});
    const [currentLocation, setCurrentLocation] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    const { currentUser } = useRegisteredUser();
  
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
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }); 
        }
        setIsLoading(false)
      })();
    }, [location]);

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
          setIsLoading(false);
          if(locationChecker(questCordinate, currentLocation, 4) === 'true') {
            setQuestStepNo((current) => current + 1)
          }
        })();
      };

    if(isLoading) return <Text>Loading</Text>
    return (
        <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={currentLocation}
          showsMyLocationButton={true}>
          <Marker
            coordinate={currentLocation}
            anchor={{ x: 0.5, y: 0.5 }}
            style={styles.marker}>
            <View
              style={{ backgroundColor: "#014c54", borderRadius: 50, padding: 2 }}>
              <Image
                style={styles.image}
                source={{uri:image}}
              />
            </View>
          </Marker>
          <Marker //marker is the pin on the map
                coordinate={questCordinate}
                anchor={{ x: 0.5, y: 0.5 }}
                style={{flex:1, justifyContent:'center', alignItems: 'center', height: 30, width: 28}}>
                <View>
                    <Image source={require('../../assets/images/marker.png')} style={{width:26, height:30 }} />
                </View>
        </Marker>
                    <Polyline
          coordinates={[currentLocation, questCordinate]}
          strokeColor={"#000"}
          strokeWidth={3}
          lineDashPattern={[1]}
        />

        </MapView>
            <Pressable onPress={updateLocation} style={styles.overlay}>
                <Text style={styles.text}>Check Location</Text>
            </Pressable>
            <Pressable style={styles.overlayCheat} onPress={()=> setQuestStepNo((current) => current + 1)}>
                <Text style={styles.text}>CHEAT!!! Skip Location</Text>
            </Pressable>
            <View style={styles.overlayTop}>
                <Text style={styles.text}>{currentStep.desc}</Text>
            </View>
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
    button: {
      margin: 10,
      padding: 10,
      color: "white",
      borderRadius: 20,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 5,
      borderColor: '#7a7877',
      backgroundColor: '#014c54',
    },
    text: {
      color: "white",
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      margin: 10,
      padding: 10,
      color: "white",
      borderRadius: 20,
      width: '50%',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 5,
      borderColor: '#7a7877',
      backgroundColor: '#014c54',
    },
    overlayTop: {
        position: 'absolute',
        top: 10,
        margin: 10,
        padding: 10,
        color: "white",
        borderRadius: 20,
        width: '90%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
      },
      overlayCheat: {
        position: 'absolute',
        bottom: 60,
        margin: 10,
        padding: 10,
        color: "white",
        borderRadius: 20,
        width: '50%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
      },

  });
  