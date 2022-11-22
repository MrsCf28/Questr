import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import { DataTable } from "react-native-paper";
import ModalDropdown from "react-native-modal-dropdown";
import { AntDesign } from '@expo/vector-icons';
import {
	VictoryArea,
	VictoryChart,
	VictoryLegend,
	VictoryPolarAxis,
	VictoryTheme,
} from "victory-native";
import { formatUserStats } from "../utils/functions";
import { getAllUserStats } from "../utils/userApi";
import { useRegisteredUser } from "../context/Context";
import LoadingComponent from "../components/LoadingComponent";
import ErrorComponent from "../components/ErrorComponent";
interface tabProp {
  selectedTab: string;
}

export function LeaderboardScreen({ selectedTab }: tabProp) {

	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(true);
	const [isLoadingGraph, setIsLoadingGraph] = useState(true);

	const { currentUser } = useRegisteredUser();
	const [allUserStats, setAllUserStats] = useState([]);


  const [compareStat, setCompareStat] = useState("xp");
  const [compareUser, setCompareUser] = useState("");
  const [comparisonCoefficient, setComparisonCoefficient] = useState(0);

  const [averageStats, setAverageStats] = useState();

	useEffect(() => {
		setIsLoading(true);
		setIsError(false)
		setIsLoadingGraph(true);
		getAllUserStats(compareStat)
			.then((res) => {
				setAllUserStats(res);
				setIsLoading(false);
				return res;
			})
			.then((res) => {
				Averager(res);
				
			}).catch((err)=>{
                setIsLoading(false);
                setIsError(true);
			});
	}, [compareStat]);


  const statOptions = [
    "xp",
    "coins",
    "dexterity",
    "exploration",
    "perception",
    "stamina",
    "strength",
    "wisdom",
  ];
  function statsTable() {
    return allUserStats.map((user) => {
      return (
        <DataTable.Row style={styles.row} key={compareStat + user.display_name}>
          <DataTable.Cell>{user.display_name}</DataTable.Cell>
          <DataTable.Cell numeric>{user.stats[compareStat]}</DataTable.Cell>
        </DataTable.Row>
      );
    });
  }

  function Averager(res) {
    let dexterity = 0;
    let exploration = 0;
    let perception = 0;
    let stamina = 0;
    let strength = 0;
    let wisdom = 0;
    const result = res.reduce((previous, current, index, array) => {
      dexterity += current.stats.dexterity;
      exploration += current.stats.exploration;
      perception += current.stats.perception;
      stamina += current.stats.stamina;
      strength += current.stats.strength;
      wisdom += current.stats.wisdom;

      if (index === array.length - 1) {
        dexterity /= array.length;
        exploration /= array.length;
        perception /= array.length;
        stamina /= array.length;
        strength /= array.length;
        wisdom /= array.length;
      }

      return {
        dexterity,
        exploration,
        perception,
        stamina,
        strength,
        wisdom,
      };
    });
    setAverageStats(result);
    setIsLoadingGraph(false);
  }


	function formattedUserStats() {
		let { formattedStats, maxStatOnRadarChart } = formatUserStats(
			currentUser.stats,
			comparisonCoefficient
		);
		if (comparisonCoefficient !== maxStatOnRadarChart) {
			setComparisonCoefficient(maxStatOnRadarChart);
		}
		return formattedStats;
	}

	function formattedComparisonStats(stats) {
		let { formattedStats } = formatUserStats(stats, comparisonCoefficient);
		return formattedStats;
	}

	if (isLoading) return <LoadingComponent />;
	if (isError) return <ErrorComponent error={"potato error"} />;
	return (
		<View style={[styles.container]}>
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
					<View style={styles.safeArea}>
						<ScrollView style={styles.scrollableArea}>
							<DataTable style={styles.table}>
								<DataTable.Header style={styles.head}>
									<DataTable.Title
										textStyle={{
											color: "brown",
											fontWeight: "bold",
											textAlign: "right",
										}}
									>
										NAME
									</DataTable.Title>
									<DataTable.Title
										numeric
										textStyle={{
											color: "brown",
											fontWeight: "bold",
											// textAlign: "right",
											textAlignVertical: "top",
										}}
									>
										<ModalDropdown
											textStyle={{
												color: "brown",
												fontWeight: "bold",
												textTransform: "uppercase",
											}}
											dropdownTextStyle={{
												color: "brown",
												fontWeight: "bold",
												textTransform: "uppercase",
												textAlign: "right",
											}}
											isFullWidth
											showsVerticalScrollIndicator
											dropdownStyle={{
												backgroundColor: "brown",
											}}
											defaultValue={compareStat}
											options={statOptions}
											onSelect={(e: Number) => {
												return setCompareStat(
													statOptions[e]
												);
											}}
											renderRightComponent={() => (
												<AntDesign name="caretdown" color="brown" />
											)}
										/>
									</DataTable.Title>
								</DataTable.Header>
								{isLoading ? (
									<Text
										style={{
											textAlign: "center",
											paddingTop: 30,
										}}
									>
										Loading
									</Text>
								) : (
									statsTable()
								)}
							</DataTable>
						</ScrollView>
					</View>

					{isLoadingGraph ? (
						<Text
							style={{
								textAlign: "center",
								paddingTop: 30,
							}}
						>
							Loading
						</Text>
					) : (
						<View style={[styles.safeArea, styles.border]}>
							<View style={{ flex: 6 }}>
								<VictoryChart
									polar
									theme={VictoryTheme.material}
									domain={{ y: [0, 1] }}
									padding={80}
									style={[styles.chart, { flex: 1 }]}
									animate={{
										duration: 500,
										onLoad: { duration: 500 },
									}}
									height={300}
									//   width={}
								>
									<VictoryLegend
										x={125}
										y={0}
										title="Comparing"
										centerTitle
										orientation="horizontal"
										gutter={5}
										style={{
											border: { stroke: "none" },
											title: { fontSize: 20 },
										}}
										borderPadding={{ top: 10 }}
										data={[
											{
												name: currentUser.display_name,
												symbol: {
													fill: "brown",
													type: "star",
												},
											},
											{
												name:
													compareUser.display_name ||
													"Average",
												symbol: { fill: "blue" },
											},
										]}
									/>
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
											grid: {
												stroke: "black",
												opacity: 0.7,
											},
											tickLabels: { fill: "brown" },
										}}
									/>
									<VictoryArea
										interpolation="linear"
										style={{
											data: {
												fill: "blue",
												fillOpacity: 0.2,
												stroke: "blue",
												strokeWidth: 4,
												strokeOpacity: 0.2,
											},
										}}
										data={
											compareUser === ""
												? formattedComparisonStats(
														averageStats
												  )
												: formattedComparisonStats(
														compareUser.stats
												  )
										}
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
							<ModalDropdown
								style={{ flex: 1 }}
								textStyle={{
									color: "brown",
									fontWeight: "bold",
								}}
								dropdownTextStyle={{
									color: "brown",
									fontWeight: "bold",
									textAlign: "center",
								}}
								showsVerticalScrollIndicator
								dropdownStyle={{
									backgroundColor: "lightlavender",
								}}
								defaultValue={
									"Click to compare to someone else..."
								}
								options={allUserStats.map((user) => {
									return user.display_name;
								})}
								onSelect={(e: String) => {
									return setCompareUser(allUserStats[e]);
								}}
								renderRightComponent={() => <AntDesign name="caretdown" color="brown" />}
							/>
						</View>
					)}
				</ImageBackground>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  hidden: {
    display: "none",
  },
  scrollableArea: {
    flex: 1,
    flexDirection: "column",
    padding: 0,
    width: "100%",
  },
  safeArea: {
    height: "37.5%",
    width: "65%",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 10,
    backgroundColor: 'none'
  },
  // border: { borderTopWidth: 5 },
  text: {
    color: "white",
  },
  options: { marginVertical: "50%" },
  chart: { width: 30, height: 30 },
  table: {
    flex: 1,
    paddingTop: 0,
    paddingHorizontal: 0,
    width: "100%",
  },
  // head: { height: 50, borderBottomWidth: 5, borderBottomColor: "white" },
  row: { height: 40 },
  cell: { color: "white" },
  blue: {
    color: "blue",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "justify",
    textAlignVertical: "center",
  },
  brown: { color: "brown", fontWeight: "bold", textTransform: "uppercase" },
});
