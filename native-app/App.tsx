import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Amplify, API, graphqlOperation, Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { CurrentUser } from "./context/CurrentUser";
import { getQuestApi, listQuestApis } from "./src/graphql/queries";

import awsExports from "./src/aws-exports";
import { fetchAllQuests, fetchQuestById } from "./utils/questApi";
import { addUser, fetchUser } from "./utils/userApi";

Amplify.configure({
	...awsExports,
	Analytics: {
		disabled: true,
	},
});

function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	const [currentUser, setCurrentUser] = useState({
		user: null,
		image: "https://picsum.photos/200/300",
		currentQuest: null,
	});
	// const [allQuests, setAllQuests] = useState([]);
	const [id, setId] = useState("1");

	const [userId, setUserId] = useState("4");
	const [newUser, setNewUser] = useState({ id: "24", age: 22 });

	useEffect(() => {
		// fetchAllQuests().then((questList) => {
		// 	setAllQuests(questList);
		// });
		setCurrentUser((currentUser) => {
			return {
				...currentUser,
				user: Auth.user.attributes.email,
			};
		});
		fetchQuestById(id);
		fetchUser(userId);
		addUser(newUser);
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
					<Navigation colorScheme={colorScheme} />
					<StatusBar />
				</CurrentUser.Provider>
			</SafeAreaProvider>
		);
	}
}

export default withAuthenticator(App);
