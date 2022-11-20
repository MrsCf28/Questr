import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { ChangeAvatar } from "../components/ChangeAvatar";
import { ProfileController } from "../components/ProfileController";
import { useRegisteredUser } from "../context/Context";
interface tabProp {
	myAvatar: string;
}

export function AvatarScreen({ myAvatar }: tabProp) {
	const { currentUser } = useRegisteredUser();

	const { dexterity, exploration, perception, stamina, strength, wisdom } =
		currentUser.stats;

	return (
		<View style={[styles.container]}>
			<ImageBackground
				source={require("../assets/images/wood.jpg")}
				style={styles.background}
				resizeMode="cover"
			>
				<View style={styles.holder}>
					<View style={styles.frame}>
						<Image
							style={styles.image}
							resizeMode="contain"
							source={myAvatar}
						/>
					</View>
					<View>
						<Text style={styles.text}>Stamina: {stamina}</Text>
						<Text style={styles.text}>
							Exploration: {exploration}
						</Text>
						<Text style={styles.text}>
							Perception: {perception}
						</Text>
						<Text style={styles.text}>Dexterity: {dexterity}</Text>
						<Text style={styles.text}>Wisdom: {wisdom}</Text>
						<Text style={styles.text}>Strength: {strength}</Text>
					</View>
				</View>
				<ChangeAvatar />
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		borderWidth: 6,
	},
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	frame: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 3,
		borderColor: "#d4d4d4",
		backgroundColor: "#292936",
		borderRadius: 20,
		height: 300,
		marginRight: 10,
	},
	holder: {
		flex: 1,
		flexDirection: "row",
		padding: 20,
		alignItems: "center",
	},
	image: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
	},
	hidden: {
		display: "none",
	},
	text: {
		fontWeight: "bold",
		lineHeight: 30,
		color: "#d4d4d4",
	},
});
