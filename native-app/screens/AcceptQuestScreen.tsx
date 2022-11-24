import React from "react";
import {
	TouchableOpacity,
	StyleSheet,
	ImageBackground,
	Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { patchUser } from "../utils/userApi";
import { useCurrentUser, useRegisteredUser } from "../context/Context";

export default function AcceptQuestScreen({ route }: any) {
	const navigation = useNavigation();

	const { setCurrentUser } = useCurrentUser();
	const { currentUser } = useRegisteredUser();

	const quest = route.params;

	function acceptQuest() {
		const updatedUser = {
			id: currentUser.id,
			current_quest_id: quest.id,
		};

		patchUser(updatedUser)
			.then((user) => {
				setCurrentUser(user);
			})
			.catch((err: any) => {
				console.log("error in patch user", err);
			});
		navigation.navigate("TabTwo");
	}

	return (
		<View style={styles.main}>
			<ImageBackground
				source={require("../assets/images/stones.jpg")}
				style={styles.container}
				resizeMode="cover"
			>
				<ImageBackground
					source={require("../assets/images/bigScroll.png")}
					resizeMode="stretch"
					style={styles.scroll}
				>
					<View style={styles.holder}>
						<Text style={styles.title}>{quest.title}</Text>

						<View style={[styles.container, styles.type]}>
							<Text style={styles.text}>Quest Type: </Text>
							<Text style={styles.cat}>{quest.category}</Text>
						</View>

						<View style={styles.container}>
							<View style={styles.iconContainer}>
								<Text style={styles.stat}></Text>
								<Image
									source={require("../assets/videos/coins.gif")}
									style={styles.icon}
								/>

								<Text style={styles.stat}>
									{quest.rewards.coins}
								</Text>
							</View>
							<View style={styles.iconContainer}>
								<Text style={styles.stat}></Text>
								<Image
									source={require("../assets/videos/xp.gif")}
									style={styles.icon}
								/>
								<Text style={styles.stat}>
									{quest.rewards.xp}
								</Text>
							</View>
							<View style={styles.iconContainer}>
								<Image
									source={require("../assets/videos/stopwatch.gif")}
									style={styles.icon}
								/>
								<Text style={styles.stat}>
									{quest.time_limit_hours} hours
								</Text>
							</View>
						</View>
						<View style={styles.container}>
							<Text style={[styles.text, styles.des]}>
								{quest.description}
							</Text>
						</View>
						<TouchableOpacity
							style={styles.button}
							onPress={acceptQuest}
						>
							<Text style={styles.buttonText}>Accept Quest</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		width: "100%",
		justifyContent: "center",
		backgroundColor: "none",
	},
	main: {
		flex: 1,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},

	scroll: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	holder: {
		flex: 1,
		paddingHorizontal: 40,
		paddingVertical: 170,
		justifyContent: "center",
		alignItems: "center",
		width: "85%",
		backgroundColor: "none",
	},
	title: {
		fontSize: 30,
		marginBottom: 0,
		fontWeight: "bold",
		color: "#014c54",
		marginTop: -20,
    textAlign:"center"
	},
	buttonContainer: {
		alignItems: "center",
		width: "100%",
		backgroundColor: "none",
	},
	button: {
		margin: 20,
		width: "80%",
		borderColor: "#7a7877",
		backgroundColor: "#014c54",
		padding: 10,
		color: "white",
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 3,
	},
	buttonText: {
		color: "white",
	},
	text: {
		textTransform: "capitalize",
		textAlign: "center",
		color: "#014c54",
	},
	cat: {
		textTransform: "capitalize",
		textAlign: "center",
		color: "red",
		fontWeight: "bold",
	},
	stat: {
		marginTop: 25,
		marginBottom: 10,
		marginLeft: 5,
		marginRight: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		color: "#014c54",
	},
	iconContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
		flexBasis: "60%",
		margin: -15,
	},
	icon: {
		backgroundColor: "transparent",
		resizeMode: "contain",
		height: 40,
		width: 40,
		marginTop: 10,
		marginBottom: 10,
		margin: 5,
		flexDirection: "column",
		justifyContent: "center",
	},
	num: {
		marginLeft: 5,
		marginRight: 5,
		paddingLeft: 5,
		paddingRight: 5,
		color: "#014c54",
		alignContent: "center",
	},
	des: {
		marginTop: 25,
	},
	type: {
		marginBottom: 20,
	},
});
