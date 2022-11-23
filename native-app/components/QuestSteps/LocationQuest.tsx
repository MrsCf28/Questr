import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TouchableHighlight,
} from 'react-native';
import * as Location from 'expo-location'; //library used to get the location from the phone
import { locationChecker } from '../../utils/functions';

import { useRegisteredUser } from '../../context/Context';
import { CurrentStep } from '../../types';

type LocationQuestProps = {
    currentStep: CurrentStep;
    setQuestStepNo: React.Dispatch<React.SetStateAction<number>>;
};

export default function LocationQuest({
    currentStep,
    setQuestStepNo,
}: LocationQuestProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [questCoordinate, setQuestCoordinate] = useState({
        latitude: Number(currentStep.endpoint[0]),
        longitude: Number(currentStep.endpoint[1]),
    });
    const [location, setLocation] = useState({});
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [popup, setPopup] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [checking, setChecking] = useState(false)

    const { currentUser } = useRegisteredUser();

    const image = currentUser.image;

    useEffect(() => {
        (async () => {
            let { status } =
                await Location.requestForegroundPermissionsAsync(); //asks the phone for permission to use location
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getLastKnownPositionAsync(
                {}
            ); //gets the last known location this is quicker than  requesting the current location the alternative is to use Location.getCurrentPositionAsync(options)
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
    }, [location]);

    const updateLocation = () => {
        (async () => {
           
            let { status } =
                await Location.requestForegroundPermissionsAsync(); //asks the phone for permission to use location
            if (status !== 'granted') {
                return;
            }
            setPopup(true)
            setChecking(true)
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
            if (
                locationChecker(
                    questCoordinate,
                    currentLocation,
                    4
                ) === 'true'
            ) {
                setChecking(false)
                setPopup(true)
                setCorrect(true)
                setTimeout(() => {
                  setPopup(false)
                  setQuestStepNo((current) => current + 1)
                  setCorrect(false)
                }, 1000)
            } else {
                setChecking(false)
                setPopup(true)
                setCorrect(false)
                setTimeout(() => {
                  setPopup(false)
                }, 1000)
            }
        })();
    };

    if (isLoading) return <Text>Loading</Text>;
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={currentLocation}
                showsMyLocationButton={true}
            >
                <Marker
                    coordinate={currentLocation}
                    anchor={{ x: 0.5, y: 0.5 }}
                    style={styles.marker}
                >
                    <View
                        style={{
                            backgroundColor: '#014c54',
                            borderRadius: 50,
                            padding: 2,
                        }}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: image }}
                        />
                    </View>
                </Marker>
                <Marker //marker is the pin on the map
                    coordinate={questCoordinate}
                    anchor={{ x: 0.5, y: 0.5 }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 30,
                        width: 28,
                    }}
                >
                    <View>
                        <Image
                            source={require('../../assets/images/marker.png')}
                            style={{ width: 26, height: 30 }}
                        />
                    </View>
                </Marker>
                <Polyline
                    coordinates={[currentLocation, questCoordinate]}
                    strokeColor={'#000'}
                    strokeWidth={3}
                    lineDashPattern={[1]}
                />
            </MapView>
            <TouchableHighlight
                onPress={updateLocation}
                style={[styles.overlay, popup? styles.disabled : null]}
                disabled={popup}
            >
                <Text style={styles.text}>Check Location</Text>
            </TouchableHighlight>
            <View style={styles.overlayTop} >
                <Text onPress={() => setQuestStepNo(current => current + 1)} style={styles.text}>{currentStep.desc}</Text>
            </View>
            {popup? 
                checking?                 
                    <View style={[styles.holder, styles.correct, styles.checking]}>
                        <Text style={styles.text}>Checking Location</Text>
                    </View> 
                    :
                    correct?             
                        <View style={[styles.holder, styles.correct]}>
                            <Text style={styles.text}>You Have Arrived!</Text>
                        </View>
                        : 
                        <View style={[styles.holder, styles.correct, styles.incorrect]}>
                            <Text style={styles.text}>You Are Not There Yet!</Text>
                        </View>
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
        color: 'white',
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
    },
    text: {
        color: 'white',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        margin: 10,
        padding: 10,
        color: 'white',
        borderRadius: 20,
        width: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
    },
    overlayTop: {
        position: 'absolute',
        top: 50,
        margin: 10,
        padding: 10,
        color: 'white',
        borderRadius: 20,
        width: '90%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
    },
    overlayCheat: {
        position: 'absolute',
        bottom: 60,
        margin: 10,
        padding: 10,
        color: 'white',
        borderRadius: 20,
        width: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
    },
    correct: {
        backgroundColor: '#0a4a20',
        height: 100,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    incorrect: {
      backgroundColor: '#4a040c',
    },
    holder: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'absolute',
        top: '50%',
        borderWidth: 3,
        borderColor: '#d4d4d4',
        backgroundColor: '#292936',
        borderRadius: 20,
        margin: 40,
        padding: 20,
        Width: '100%',
    },
    disabled: {
        backgroundColor: "#4a040c",
    },
    checking: {
        backgroundColor: '#014c54'
    }
});
