import React from "react";
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

export default function TabThreeScreen({
	navigation,
}: RootTabScreenProps<"TabThree">) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab Three</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<VictoryChart
				polar
				theme={VictoryTheme.material}
				domain={{ y: [0, 1] }}
				padding={30}
			>
				<VictoryPolarAxis
					dependentAxis
					style={{
						axis: { stroke: "none" },
						tickLabels: { fill: "none" },
						grid: { stroke: "yellow", strokeDasharray: "10,10  " },
					}}
    
				/>
				<VictoryPolarAxis
					tickValues={[
						"strength",
						"stamina",
						"energy",
						"defense",
						"potato",
						"wisdom",
					]}
					tickCount={6}
				/>
				<VictoryArea
					interpolation="linear"
					style={{
						data: {
							fill: "white",
							stroke: "orange",
							strokeWidth: 4,
						},
					}}
					data={[0.9, 0.4, 0.5, 0.2,0.3,0.6]}
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
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
