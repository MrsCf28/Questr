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

export function Graph() {
  return (
    <View style={styles.container}>
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 1] }}
        padding={60}>
        <VictoryPolarAxis
          dependentAxis
          style={{
            axis: { stroke: "none" },
            tickLabels: { fill: "none" },
            grid: { stroke: "grey", strokeDasharray: "10,10  " },
          }}
        />
        <VictoryPolarAxis
          tickValues={[
            "stamina",
            "exploration",
            "perception ",
            "dexterity",
            "wisdom",
            'strength'
          ]}
          labelPlacement="vertical"
          tickCount={6}
        />
        <VictoryArea
          interpolation="linear"
          style={{
            data: {
              fill: "white",
              stroke: "green",
              strokeWidth: 4,
            },
          }}
          data={[1, 0.6, 0.5, 0.9, 0.7, 0.3]}
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
});
