import {
	FontAwesome,
	MaterialCommunityIcons,
	FontAwesome5,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, StatusBar, StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AcceptQuestScreen from "../screens/AcceptQuestScreen";
import CurrentQuestScreen from "../screens/CurrentQuestScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/ProfilePage";
import TabTwoScreen from "../screens/MainMapScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import NoQuestScreen from "../screens/NoQuestScreen";
import CameraScreen from "../screens/CameraScreen";
import { TopTabs } from "./TopTabs";
import { AvatarSelector } from "../screens/AvatarSelector";
import CompletedQuestScreen from "../screens/CompletedQuest";
import { LeaderboardScreen } from "../screens/LeaderboardScreen";

import { useCurrentUser, useRegisteredUser } from "../context/Context";
import ActiveQuestScreen from "../screens/ActiveQuestScreen";
import DisclaimerScreen from "../screens/DisclaimerScreen";
import { useState } from "react";
export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	const [press, setPress] = useState(false);
	const { currentUser } = useCurrentUser();
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			{currentUser.type === "registered" ? (
				press ? (
					<RootNavigator />
				) : (
					<DisclaimerScreen setPress={setPress} />
				)
			) : (
				<EditProfileScreen />
			)}
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modalhi
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
	const { currentUser } = useRegisteredUser();

	return (
		<Stack.Navigator>
			
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{
					title: "Oops!",
					headerTintColor: "white",
					headerStyle: {
						backgroundColor: "#014c54",
					},
				}}
			/>
			<Stack.Group
				screenOptions={{
					presentation: "modal",
				}}
			>
				<Stack.Screen
					name="AvatarSelector"
					component={AvatarSelector}
					options={{
						title: "Avatar Selector",
						headerTintColor: "white",
						headerStyle: {
							backgroundColor: "#014c54",
						},
					}}
				/>
			</Stack.Group>

			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					name="CurrentQuest"
					component={
						currentUser.current_quest_id !== "0"
							? CurrentQuestScreen
							: NoQuestScreen
					}
					
				/>
			</Stack.Group>

			<Stack.Group
				screenOptions={{
					presentation: "modal",
					headerShown: false,
				}}
			>
				<Stack.Screen
					name="ActiveQuestScreen"
					component={ActiveQuestScreen}
					options={{
						title: "Current Quest",
						headerTintColor: "white",
						headerStyle: {
							backgroundColor: "#014c54",
						},
					}}
				/>
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					presentation: "modal",
					headerShown: false,
				}}
			>
				<Stack.Screen name="CameraScreen" component={CameraScreen} />
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					presentation: "modal",
				}}
			>
				<Stack.Screen
					name="CompletedQuestScreen"
					component={CompletedQuestScreen}
					options={{
						title: "A Champion's Reward",
						headerTintColor: "white",
						headerStyle: {
							backgroundColor: "#014c54",
						},
					}}
				/>
			</Stack.Group>

			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					name="AcceptQuest"
					component={AcceptQuestScreen}
					options={{
						title: "Confirm Quest",
						headerTintColor: "white",
						headerStyle: {
							backgroundColor: "#014c54",
						},
					}}
				/>
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen
					name="EditProfile"
					component={EditProfileScreen}
					options={{
						title: "Edit Profile",
						headerTintColor: "white",
						headerStyle: {
							backgroundColor: "#014c54",
						},
					}}
				/>
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					presentation: "modal",
				}}
			>
				<Stack.Screen
					name="LeaderboardScreen"
					component={LeaderboardScreen}
					options={{
						title: "Leaderboard",
						headerTintColor: "white",
						headerStyle: {
							backgroundColor: "#014c54",
						},
					}}
				/>
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					height: 70,
					paddingBottom: 5,
					backgroundColor: "#014c54",
					borderTopWidth: 3,
					borderTopColor: "#7a7877",
				},
				tabBarLabelStyle: {
					textTransform: "capitalize",
					letterSpacing: 2,
				},
				tabBarActiveTintColor: "white",
				tabBarInactiveTintColor: "#7a7877",
			}}
		>
			<BottomTab.Screen
				name="TabOne"
				component={TopTabs}
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name="home" size={30} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="TabTwo"
				component={TabTwoScreen}
				options={{
					title: "Quest Map",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="map-outline"
							size={30}
							color={color}
						/>
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	tab: {
		backgroundColor: "blue",
	},
});
