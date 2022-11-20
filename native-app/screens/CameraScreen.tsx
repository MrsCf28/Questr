import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  useWindowDimensions,
  Pressable,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "../components/CameraButton";

import * as FileSystem from "expo-file-system";
import { fetchQuestById } from "../utils/questApi";
import { CurrentUser } from "../context/CurrentUser";
import { useNavigation } from "@react-navigation/native";

import postClarifai from "../clarifaiAPI/callAPI";
import postUrlClarifai from "../clarifaiAPI/urlAPI";
import { Storage } from "aws-amplify";

export default function CameraScreen({ route }) {
  // Quest and user details
  const { currentUser, setCurrentUser } = useContext(CurrentUser);
  const [currentQuest, setCurrentQuest] = useState(null);

  // Camera permissions and controls
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isLoading, setIsLoading] = useState(true);
  const cameraRef = useRef(null);

  // Image, predictions and result
  const [image, setImage] = useState({});
  const [predict, setPredict] = useState({});
  const [imageErr, setImageErr] = useState(false);
  const [uploading, setUploading] = useState(false);
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
      console.log(data, data.uri);
      const source = { uri: data.uri };
      //setImage(() => setImage(source));
      try {
        const response = await fetch(data.uri);
        const blob = await response.blob();
        let currDate = new Date().toJSON();
        Storage.put(currDate, blob, {
          // contentType: 'image/jpeg' // contentType is optional
        }).then((result) => {
          const signedURL = Storage.get(result.key).then((res) => {
            console.log("signedURL: ", res);
            postUrlClarifai(res, predict, setPredict).then((res) => {
              let endpoints = currentQuest.objectives[0].endpoint;
              Object.values(predict).forEach((concept) => {
                console.log(concept.name);
                if (endpoints.includes(concept.name)) {
                  console.log("Match --", concept.name);
                  //setQuestStatus(true);
                }
              });
            });
          });
        });
      } catch (err) {
        console.log("Error uploading file:", err);
      }
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
            style={{ width: "100%", height: height }}
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
            <Pressable
              style={[styles.button, styles.cancel]}
              onPress={() =>
                navigation.navigate("CompletedQuestScreen", {
                  currentQuest,
                  currentUser,
                })
              }
            >
              <Text style={styles.buttonText}>CHEAT!!!! COMPLETE QUEST</Text>
            </Pressable>
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
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
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
  button: {
    margin: 20,
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
  buttonText: {
    color: "white",
  },
});
