import React, { useState } from "react";
import {
	StyleSheet,
	Image,
	ImageBackground,
	TouchableOpacity,
	DevSettings,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "../components/Themed";

export default function ErrorComponent({ error }) {
	console.log("error: ", error);
	const [reloading, setReloading] = useState(false);
	const navigation = useNavigation();

	return (
		<View style={styles.loadContainer}>
			<ImageBackground
				resizeMode="contain"
				style={styles.imageError}
				source={require("../assets/videos/crossedSword.gif")}
			/>
			{reloading ? (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>Reloading</Text>
				</View>
			) : (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>Error: {error}</Text>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Text style={styles.errorSubText}>
							Press here to go back
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							setReloading(true);
							DevSettings.reload();
						}}
					>
						<Text style={styles.errorSubText}>
							Press here to refresh app
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	loadContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// height: "100%",
		width: "100%",
	},
	imageError: {
		borderColor: "black",
		flex: 1,
		// height: "100%",
		width: "100%",
	},
	errorContainer: {
		flex: 1,
		// justifyContent: "center",
		alignItems: "center",
		// height: "100%",
		width: "100%",
	},
	errorText: {
		textAlignVertical: "top",
		textAlign: "center",
		fontSize: 40,
		padding: 10,
	},
	errorSubText: {
		margin: 20,
		width: 300,
		borderColor: "#7a7877",
		backgroundColor: "#014c54",
		padding: 15,
		color: "white",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 3,
		textAlign: "center",
		textAlignVertical: "center",
		// textAlignVertical: "top",
		// textAlign: "center",
		fontSize: 20,
		// padding: 10,
		// borderWidth:10,
		// width:"90%",
		// borderColor:"white",
		// borderRadius:50
	},
});
