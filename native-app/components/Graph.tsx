import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import {
	VictoryArea,
	VictoryBar,
	VictoryChart,
	VictoryLabel,
	VictoryPolarAxis,
	VictoryTheme,
} from "victory-native";
import { CurrentUser } from "../context/CurrentUser";
import { formatUserStats } from "../utils/functions";

export function Graph() {
	// const { currentUser.stats } = useContext(CurrentUser);

	const fakeStats: {
		dexterity: number;
		exploration: number;
		perception: number;
		stamina: number;
		strength: number;
		wisdom: number;
		xp: number;
		coins: number;
	} = {
		dexterity: 1,
		exploration: 2,
		perception: 3,
		stamina: 4,
		strength: 5,
		wisdom: 6,
		xp: 100,
		coins: 100,
	};

	console.log("result", formatUserStats(fakeStats));
	return (
		<View style={styles.container}>
			<VictoryChart
				polar
				theme={VictoryTheme.material}
				domain={{ y: [0, 1] }}
				padding={60}
        
			>
				<VictoryPolarAxis
					dependentAxis
					style={{
						axis: { stroke: "none" },
						tickLabels: { fill: "none" },
						grid: { stroke: "black", strokeDasharray: "10,10",opacity: 0.1},
					}}
				/>
				<VictoryPolarAxis
					tickValues={[
						"dexterity",
						"exploration",
						"perception",
						"stamina",
						"strength",
						"wisdom",
					]}
					labelPlacement="vertical"
					tickCount={6}
					style={{
						axis: { stroke: "none" },
						grid: { stroke: "black", opacity: 0.7 },
						tickLabels: { fill: "brown"},
					}}
				/>
				<VictoryArea
					interpolation="linear"
					style={{
						data: {
							fill: "brown",
							fillOpacity: 0.3,
							stroke: "brown",
							strokeWidth: 4,
              strokeOpacity:1
						},
					}}
					data={formatUserStats(fakeStats)}
				/>
			</VictoryChart>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(128,193,255,0.0)",
	},
});
