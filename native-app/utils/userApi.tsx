import { API, graphqlOperation } from 'aws-amplify';
import {
    createUserApi,
    updateUserApi,
} from '../src/graphql/mutations';
import {
    getUserApi, listUserApis,
} from '../src/graphql/queries';

export function fetchUserById(id: string) {
    return API.graphql(graphqlOperation(getUserApi, { id: id })).then(
        userData => {
            return userData.data.getUserApi;
        }
    );
}

export async function addUser(newUser: object) {
    try {
        const newUserData = await API.graphql(
            graphqlOperation(createUserApi, { input: newUser })
        );
        console.log('new user has been created');
    } catch (err) {
        console.log('ERROR creating new user: ', err);
    }
}

export async function fetchUserIdsPlay() {
    try {
        const usersData = await API.graphql(
            graphqlOperation(listUserApis)
        );
        const usersList = usersData.data.listUserApis.items;
        const userIds = usersList.map(user => user.id);
    } catch (err) {
        console.log('ERROR fetching UserIds: ', err);
    }
}

export function patchUser(updatedUser: object) {
    return API.graphql(
        graphqlOperation(updateUserApi, { input: updatedUser })
    ).then(userData => {
        return userData.data.getUserApi;
    });
}
