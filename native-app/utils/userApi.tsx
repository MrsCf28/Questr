import { API, graphqlOperation } from "aws-amplify";
import { getQuestApi, getUserApi, listQuestApis } from "../src/graphql/queries";

export async function fetchUser(id : string) {
  try {
    const userData = await API.graphql(graphqlOperation(getUserApi, { id: id }))
    const userList = userData.data.getUserApi;
    console.log(userList, 'user')
  } catch (err) {
    console.log("ERROR fetching userLists: ", err);
  }
}

