import React, { useState, useContext, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	ScrollView,
	ImageBackground,
} from "react-native";
import { LeaderboardStatsCard } from "../components/LeaderboardStatsCard";
import { getAllUserStats } from "../utils/userApi";
interface tabProp {
	selectedTab: string;
}

export function LeaderboardScreen({ selectedTab }: tabProp) {
	const [allUserStats, setAllUserStats] = useState([]);
	useEffect(() => {
		getAllUserStats("xp").then((res) => {
			console.log("res in histroy: ", res);
			setAllUserStats(res);
		});
	}, []);

	return (
		<View style={[styles.container]}>
			<ImageBackground
				source={require("../assets/images/stones.jpg")}
				style={styles.container}
				resizeMode="cover"
			>
				<View style={styles.separator} />
				
				<ScrollView style={styles.scrollableArea}>
					{allUserStats.map((user) => {
						return (
							<LeaderboardStatsCard
								key={user.display_name}
								user={user}
							/>
						);
					})}
				</ScrollView>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	hidden: {
		display: "none",
	},
	scrollableArea: {
		flex: 1,
		flexDirection: "column",
		padding: 10,
	},
	separator: {
		marginVertical: 30,
		width: "80%",
	},
	text: {
		color: "white",
	},
});
