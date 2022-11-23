import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";

import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "../components/CameraButton";

import * as FileSystem from "expo-file-system";
import { fetchQuestById } from "../utils/questApi";
import { useNavigation } from "@react-navigation/native";

import { useRegisteredUser } from "../context/Context";

import {
  fetchImagePredictions,
} from "../clarifaiAPI/clarifaiAPI";
import uploadImage from "../components/ImageSelector";
import ImageUploadingButton from "../components/ImageUploadingButton";
import { initialQuest } from "../utils/initialStates";

type CameraScreenProps = {
  setQuestStepNo: React.Dispatch<React.SetStateAction<number>>;
}

export default function CameraScreen({ setQuestStepNo }: CameraScreenProps) {
  const { currentUser } = useRegisteredUser();

  // Quest and user details
  const [currentQuest, setCurrentQuest] = useState(initialQuest);

  // Camera permissions and controls
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
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
      setHasCameraPermission(() => cameraStatus.status === "granted");
    })();
  }, []);

  function addStep() {
    setQuestStepNo((current) => current + 1);
  }

  const takePicture = async () => {
    setUploading(true);
    console.log("taking picture");

    if (cameraRef) {
      const data = await cameraRef.current.takePictureAsync();
      // console.log(data, data.uri);
      const source = { uri: data.uri };

      const image64 = await FileSystem.readAsStringAsync(data.uri, {
        encoding: "base64",
      });

      if (typeof image64 === "string") {
        uploadImage(image64).then((url) => {
          setUploading(() => setUploading(false));
          fetchImagePredictions(url)
            .then((res) => {
              let results = res.map((obj) => obj.name);
              setPredict(() => setPredict(results)); // Need to wait for this
              setPredict(results);
              let endpoints = currentQuest.objectives[0].endpoint;
              console.log("quest endpoints", endpoints);
              console.log("Predictions", results);
              let status = false;

              Object.values(results).forEach((concept) => {
                console.log(concept, endpoints[2], concept === endpoints[2]);

                if (endpoints.includes(concept)) {
                  console.log("Correct term detected.", concept);
                  setQuestStatus(true);
                  status = true;
                  Alert.alert("Thee hath found", "", [
                    { text: "Continue", onPress: addStep },
                  ]);
                }
              });
              if (!status) {
                Alert.alert(
                  "Thee not hath found",
                  "Keepeth searching/retake picture",
                  [{ text: "OK" }]
                );
              }
            })
            .catch((err) => {
              console.log("Error in fetchPredictions", err);
              setUploading(false);
            });
        });
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
              {uploading ? (
                <View style={styles.loadContainer}>
                  <ImageUploadingButton />
                </View>
              ) : (
                <View style={styles.flexrow}>
                  <CameraButton
                    title={"take picture"}
                    color={"white"}
                    icon="camera"
                    onPress={takePicture}
                  />
                  <CameraButton
                    title={"flip camera"}
                    color={"white"}
                    icon="retweet"
                    onPress={flipCamera}
                  />
                  <CameraButton
                    title={"flash"}
                    color={
                      flash === FlashMode.off
                        ? "white"
                        : "yellow"
                    }
                    icon="flash"
                    onPress={() => {
                      setFlash(
                        flash === FlashMode.off
                          ? FlashMode.on
                          : FlashMode.off
                      );
                    }}
                  />
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setQuestStepNo((current) => current + 1)}
            >
              <Text style={styles.buttonText}>CHEAT!!!! COMPLETE QUEST</Text>
            </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  button: {
    margin: 20,
    borderColor: "#7a7877",
    backgroundColor: "#014c54",
    borderWidth: 3,
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadingIcon: {
    margin: 20,
    width: "20%",
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
    marginBottom: 300,
  },
});
