import { API, graphqlOperation } from 'aws-amplify';
// import { getUserApiStats } from '../src/graphql/custom-queries';
import {
    createUserApi,
    updateUserApi,
} from '../src/graphql/mutations';
import { getUserApi } from '../src/graphql/queries';
import { RegisteredUser } from '../types';

export function fetchUserById(
    id: string
): Promise<RegisteredUser | null> {
    return API.graphql(graphqlOperation(getUserApi, { id: id })).then(
        (userData: object) => {
            return userData.data.getUserApi;
        }
    );
}

export async function addUser(newUser: RegisteredUser) {
    return API.graphql(
        graphqlOperation(createUserApi, { input: newUser })
    );
}

export function patchUser(
    updatedUser: RegisteredUser
): Promise<RegisteredUser> {
    return API.graphql(
        graphqlOperation(updateUserApi, { input: updatedUser })
    ).then((userData: object) => {
        return userData.data.getUserApi;
    });
}

// export function fetchUserStats(id: string) {
//     return API.graphql(
//         graphqlOperation(getUserApiStats, { id: id })
//     ).then(res => {
//         return res.data.getUserApi.stats;
//     });
// }
