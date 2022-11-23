import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import TabOneScreen from "../screens/ProfilePage";
import CurrentQuestScreen from "../screens/CurrentQuestScreen";
import NoQuestScreen from "../screens/NoQuestScreen";
import { HistoryScreen } from "../components/HistoryScreen";
import { useRegisteredUser } from "../context/Context";
import { Image, ImageBackground } from "react-native";
import { Text } from "../components/Themed";

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TopTab = createMaterialTopTabNavigator();

export function TopTabs() {
	const { currentUser } = useRegisteredUser();

	function background() {
		return <Image source={require("../assets/images/stones.jpg")} />;
	}
	return (
		<SafeAreaView style={{ flex: 1}}>
			<TopTab.Navigator
				initialRouteName="Home"
				screenOptions={{
					tabBarStyle: {
						height: 70,
						paddingBottom: 5,
						// paddingTop: 0,
						backgroundColor: "#014c54",
						borderBottomWidth:3,
						borderColor:"#7a7877",
					},
					tabBarLabelStyle:{textTransform:"capitalize"},
					tabBarActiveTintColor: "white",
					tabBarInactiveTintColor:"#7a7877",
					tabBarIndicatorStyle: {backgroundColor: "#714431", height:0,  borderRadius:10},
					tabBarShowIcon:true,
					// tabBarIconStyle:{borderColor:"brown"}
				}}
			>
				<TopTab.Screen name="Home" component={TabOneScreen} options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name="home" size={24} color={color} />
					),
				}}
				/>
				<TopTab.Screen name="History" component={HistoryScreen} options={{
					title: "History",
					tabBarIcon: ({ color }) => (
						<MaterialIcons name="history-edu" size={24} color={color} />
					),
				}}/>
				<TopTab.Screen
					name="CurrentQuest"
					component={
						currentUser.current_quest_id !== "0"
							? CurrentQuestScreen
							: NoQuestScreen
					}
					options={{
						title: "Current Quest",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="shield-sword" size={24} color={color} />
						),
					}}
				/>
			</TopTab.Navigator>
			<StatusBar />
		</SafeAreaView>
	);
}
