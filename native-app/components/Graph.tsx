import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";

import {
	VictoryArea,
	VictoryChart,
	VictoryPolarAxis,
	VictoryTheme,
} from "victory-native";
import { formatUserStats } from "../utils/functions";
import { useRegisteredUser } from "../context/Context";

export function Graph() {
	const { currentUser } = useRegisteredUser();

	function formattedUserStats() {
		let { formattedStats } = formatUserStats(currentUser.stats);
		return formattedStats;
	}
	return (
		<View style={styles.container}>
			<VictoryChart
				polar
				theme={VictoryTheme.material}
				domain={{ y: [0, 1] }}
				padding={80}
				animate={{
					duration: 2000,
					onLoad: { duration: 1000 },
				}}
			>
				<VictoryPolarAxis
					dependentAxis
					style={{
						axis: { stroke: "none" },
						tickLabels: { fill: "none" },
						grid: {
							stroke: "black",
							strokeDasharray: "10,10",
							opacity: 0.1,
						},
					}}
				/>
				<VictoryPolarAxis
					tickValues={[
						"Dexterity",
						"Exploration",
						"Perception",
						"Stamina",
						"Strength",
						"Wisdom",
					]}
					labelPlacement="vertical"
					tickCount={6}
					style={{
						axis: { stroke: "none" },
						grid: { stroke: "black", opacity: 0.7 },
						tickLabels: { fill: "brown" },
					}}
				/>
				<VictoryArea
					interpolation="linear"
					style={{
						data: {
							fill: "brown",
							fillOpacity: 0.5,
							stroke: "brown",
							strokeWidth: 4,
							strokeOpacity: 1,
						},
					}}
					data={formattedUserStats()}
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
