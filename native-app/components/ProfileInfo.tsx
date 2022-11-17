import React from "react";
import { useContext } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { CurrentUser } from "../context/CurrentUser";

export function ProfileInfo() {
	const { currentUser } = useContext(CurrentUser);

	const { image } = currentUser;

	const stats: { xp: number; coins: number } = { xp: 0, coins: 100 };
	// console.log(image)
	const ranks: string[] = [
		"ToddlerTime",
		"LilPete",
		"AdolescentAlex",
		"WiseWolfred",
		"BigDaddy",
	];

	console.log("ranks[-1]: ", ranks[ranks.length - 1]);

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: image }} />
			<View>
				<Text style={styles.title}>{currentUser.user}</Text>
				<Text style={styles.text}>
					Rank:{" "}
					{stats.xp >= ((ranks.length) * 100)
						? ranks[ranks.length-1]
						: ranks[Math.floor(stats.xp / 100)]}
				</Text>
				<Text style={styles.text}>XP: {stats.xp}</Text>
				<Text style={styles.text}>Coins: {stats.coins}</Text>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 2,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 20,
	},
	title: {
		fontWeight: "bold",
		color: "#291403",
	},
	text: {
		color: "#291403",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
	image: {
		height: 150,
		width: 150,
		borderRadius: 100,
		margin: 10,
		borderWidth: 5,
		borderColor: "#291403",
	},
});
