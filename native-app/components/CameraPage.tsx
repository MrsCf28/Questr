import React, { useState, useEffect, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TextInput,
	useWindowDimensions,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import CameraButton from "./CameraButton";

export default function CameraPage() {
	const [hasCameraPermission, setHasCameraPermission] = useState(null);
	const [image, setImage] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
	const cameraRef = useRef(null);

	const { width } = useWindowDimensions();
	const height = Math.round((width * 16) / 9);

	useEffect(() => {
		(async () => {
			MediaLibrary.requestPermissionsAsync();
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === "granted");
		})();
	}, []);

	const takePicture = async () => {
		// console.log(CameraType);
		if (cameraRef) {
			try {
				const data = await cameraRef.current.takePictureAsync();
				// console.log(data);
				setImage(data.uri);
			} catch (err) {
				console.log(err);
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
