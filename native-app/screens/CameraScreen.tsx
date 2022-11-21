import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  useWindowDimensions,
  Pressable,
  Alert,
  Image,
} from "react-native";

import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "../components/CameraButton";

import * as FileSystem from "expo-file-system";
import { fetchQuestById } from "../utils/questApi";
import { useNavigation } from "@react-navigation/native";

import { Storage } from "aws-amplify";
import { useRegisteredUser } from "../context/Context";

import {
  fetchRPSPredictions,
  fetchImagePredictions,
} from "../clarifaiAPI/clarifaiAPI";

export default function CameraScreen({ route, setQuestStepNo }: any) {
  const { currentUser } = useRegisteredUser();

  // Quest and user details
  const [currentQuest, setCurrentQuest] = useState(null);

  // Camera permissions and controls
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isLoading, setIsLoading] = useState(true);
  const cameraRef = useRef(null);

  // Image, predictions and result
  const [image, setImage] = useState({});
  const [predict, setPredict] = useState([]);
  const [imageErr, setImageErr] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [questStatus, setQuestStatus] = useState(false);
  const video = React.useRef(null);

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
    console.log("taking picture");

    let url =
      "https://questr-image-bucket.s3.eu-west-2.amazonaws.com/Screenshot+2022-11-20+at+17.23.22.png";

    //fetchRPSPredictions

    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      console.log(data, data.uri);
      const source = { uri: data.uri };
      //setImage(() => setImage(source));

      // S3 upload and url grab

      try {
        const response = await fetch(data.uri);
        const blob = await response.blob();
        let currDate = new Date().toJSON();
        setUploading(true);
        Storage.put(currDate, blob, {
          // contentType: 'image/jpeg' // contentType is optional
        }).then((result) => {
          const signedURL = Storage.get(result.key).then((url) => {
            console.log("signedURL: ", url);

            // INSERT FETCH IMAGE PREDICTION here
            fetchImagePredictions(url).then((res) => {
              let results = res.map((obj) => obj.name);
              setPredict(() => setPredict(results));
              console.log("your predictions", results);
              let endpoints = currentQuest.objectives[0].endpoint;
              console.log("quest endpoints", endpoints);
              console.log("Predictions", predict);
              Object.values(predict).forEach((concept) => {
                if (endpoints.includes(concept.name)) {
                  console.log("Correct term detected.", concept.name);
                  setQuestStatus(true);
                }
              });
              if (!questStatus) {
                Alert.alert(
                  "Thee not hath found",
                  "Keepeth searching/retake picture",
                  [{ text: "OK" }]
                ).catch((err) => {
                  console.log("Error in fetchPredictions", err);
                  setUploading(false);
                });
              }
            });
          });
        });
      } catch (err) {
        setUploading(false);
        console.log("Error uploading file:", err);
      }
    }
    setUploading(false);
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
  if (uploading) {
    return (
      <View style={styles.loadContainer}>
        <Image
          style={styles.imageLoading}
          source={require("../assets/videos/loadingIR.gif")}
        />
      </View>
    );
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
              onPress={() => setQuestStepNo((current) => current + 1)}
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
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageLoading: {
    borderColor: "black",
    flex: 1,
    margin: 60,
    width: "90%",
  },
});
