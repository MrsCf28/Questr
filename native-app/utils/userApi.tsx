import { API, graphqlOperation } from "aws-amplify";
import { listUserStatsApi } from "../src/graphql/custom-queries";
import { getUserApiStats } from "../src/graphql/custom-queries";
import { createUserApi, updateUserApi } from "../src/graphql/mutations";
import { getUserApi, listUserApis } from "../src/graphql/queries";

export function fetchUserById(id: string) {
	return API.graphql(graphqlOperation(getUserApi, { id: id })).then(
		(userData) => {
			return userData.data.getUserApi;
		}
	);
}

export async function addUser(newUser: object) {
	try {
		const newUserData = await API.graphql(
			graphqlOperation(createUserApi, { input: newUser })
		);
		console.log("new user has been created");
	} catch (err) {
		console.log("ERROR creating new user: ", err);
	}
}

export async function fetchUserIdsPlay() {
	try {
		const usersData = await API.graphql(graphqlOperation(listUserApis));
		const usersList = usersData.data.listUserApis.items;
		const userIds = usersList.map((user) => user.id);
	} catch (err) {
		console.log("ERROR fetching UserIds: ", err);
	}
}

export function patchUser(updatedUser: object) {
	return API.graphql(
		graphqlOperation(updateUserApi, { input: updatedUser })
	).then((userData) => {
		return userData.data.getUserApi;
	});
}

export function fetchUserStats(id: string) {
	return API.graphql(graphqlOperation(getUserApiStats, { id: id })).then(
		(res) => {
			return res.data.getUserApi.stats;
		}
	);
}

export function getAllUserStats(sortBy: string) {
	return API.graphql(graphqlOperation(listUserStatsApi)).then((res) => {
        console.log('res: ', res.data.listUserApis.items);
        const stats = res.data.listUserApis.items
        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            const statA = a.stats[sortBy];
            const statB = b.stats[sortBy];
          
            let comparison = 0;
            if (statA > statB) {
              comparison = 1;
            } else if (statA < statB) {
              comparison = -1;
            }
            return comparison;
          }
          
		return stats.sort(compare);
	});
}
