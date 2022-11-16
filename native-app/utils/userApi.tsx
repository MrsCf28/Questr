import { API, graphqlOperation } from "aws-amplify";
import { createUserApi } from "../src/graphql/mutations";
import { getQuestApi, getUserApi, listQuestApis } from "../src/graphql/queries";

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
    console.log("newUserData: ", newUserData);
  } catch (err) {
    console.log("ERROR creating new user: ", err);
  }
}

export async function fetchUserIdsPlay() {
  try {
    const usersData = await API.graphql(graphqlOperation(listUserApis));
    const usersList = usersData.data.listUserApis.items;
    const userIds = usersList.map((user) => user.id);
    console.log(userIds, "<< userIds");
  } catch (err) {
    console.log("ERROR fetching UserIds: ", err);
  }
}

export function patchUser(updatedUser) {
  return API.graphql(graphqlOperation(updateUserApi, {input: updatedUser})).then(
    (userData) => {
      return userData.data.getUserApi;
    }
  );
}
