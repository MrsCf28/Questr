import { API, graphqlOperation } from "aws-amplify";
import { createUserApi } from "../src/graphql/mutations";
import { getQuestApi, getUserApi, listQuestApis } from "../src/graphql/queries";

export async function fetchUser(id: string) {
	try {
		const userData = await API.graphql(
			graphqlOperation(getUserApi, { id: id })
		);
		const userList = userData.data.getUserApi;
		// console.log(userList, 'user')
	} catch (err) {
		console.log("ERROR fetching userLists: ", err);
	}
}

export async function addUser(newUser:object) {
	try {
		const newUserData = await API.graphql(
			graphqlOperation(createUserApi, { input: newUser})
		);
		console.log("newUserData: ", newUserData);
	} catch (err) {
		console.log("ERROR creating new user: ", err);
	}
}
