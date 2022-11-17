
import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, useWindowDimensions, } from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "../components/CameraButton";
import postClarifai from "../clarifaiAPI/callAPI";
import * as FileSystem from "expo-file-system";
import { fetchQuestById } from "../utils/questApi";
import { CurrentUser } from "../context/CurrentUser";

import { useNavigation } from "@react-navigation/native";



export default function CameraScreen({ route }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [predict, setPredict] = useState({});
  const [imageErr, setImageErr] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cameraRef = useRef(null);

  const { currentUser, setCurrentUser } = useContext(CurrentUser);
  const [currentQuest, setCurrentQuest] = useState(null);
  const [questStatus, setQuestStatus] = useState(false);

  const navigation = useNavigation();

  const { width } = useWindowDimensions();
	const height = Math.round((width * 16) / 9);


  // const { questStatus, setQuestStatus } = route.params;

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

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (questStatus) {
      navigation.navigate("CompletedQuestScreen", {
        currentQuest,
        currentUser,
      });
    }
  }, [questStatus]);

  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      const base64Img = await FileSystem.readAsStringAsync(data.uri, {
        encoding: "base64",
      });
      postClarifai(base64Img, predict, setPredict)
        .then((res) => {
          let endpoints = currentQuest.objectives[0].endpoint;
          console.log("here", currentQuest.objectives[0].endpoint);
          //console.log(predict, "predict in camerascreen");
          //setPredict(() => setPredict(res));
          //console.log("CameraPage", res, predict);

          Object.values(predict).forEach((concept) => {
            if (endpoints.includes(concept.name)) {
              //setQuestStatus(true);
              console.log("Correct term detected.", concept.name);
              setQuestStatus(true);
            }
          });
        })
        .catch((err) => {
          console.log(err);
          setImageErr(true);
        });
    }
  };

  const flipCamera = async () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  if (hasCameraPermission === false) {
    return <Text>No access</Text>;
  }
  if (imageErr) {
    return <Text>Error sending image. Please reload and try again.</Text>;
  }

  return (
    <View style={styles.appContainer}>
    {hasCameraPermission ? (
      <View style={styles.container}>
        <Camera
          ratio="16:9"
          style={
            { width: "100%", height: height }
          }
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View style={styles.flexrow}>
            <CameraButton
              title={"take picture"}
              color={"red"}
              icon="camera"
              onPress={takePicture}
            />
            <CameraButton
              title={"flip camera"}
              color={"blue"}
              icon="retweet"
              onPress={flipCamera}
            />
            <CameraButton
              title={"flash"}
              color={
                flash === Camera.Constants.FlashMode.off
                  ? "yellow"
                  : "#f1f1f1"
              }
              icon="flash"
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            />
          </View>
        </Camera>
      </View>
    ) : (
      <Text>Camera</Text>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		justifyContent: "center",
	},
	container: { flex: 1, alignItems: "center",
  justifyContent: "center",},
	camera: {
		flex: 1,
		borderRadius: 20,
		padding: 50,
		justifyContent: "flex-end",
	},
	flexrow: {
		flex: 1,
    // backgroundColor:"black",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "center",
	},
});
