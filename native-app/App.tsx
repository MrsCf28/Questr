import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify, API, graphqlOperation, Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { CurrentUser } from './context/CurrentUser';
import { getQuestApi, listQuestApis } from './src/graphql/queries';

import awsExports from './src/aws-exports';
import { fetchAllQuests, fetchQuestById } from './utils/questApi';
import {
    addUser,
    fetchUserById,
    fetchUserIdsPlay,
} from './utils/userApi';
import EditProfileScreen from './screens/EditProfileScreen';

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
        image: 'https://picsum.photos/200/300',
        currentQuest: null,
    });
    // const [allQuests, setAllQuests] = useState([]);
    const [id, setId] = useState(Auth.user.attributes.sub);
    const [userId, setUserId] = useState('4');
    const [newUser, setNewUser] = useState({ id: '24', age: 22 });
    const [signedUp, setSignedUp] = useState(true);

    useEffect(() => {
        fetchUserById(id)
            .then(user => {
                if (user === null) {
                    setSignedUp(false);
                } else {
                    console.log(id, user);
                    setSignedUp(true);
                }
            });
        setCurrentUser(currentUser => {
            return {
                ...currentUser,
            };
        });
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <CurrentUser.Provider
                    value={{ currentUser, setCurrentUser }}
                >
                    {!signedUp && <EditProfileScreen signedUp={signedUp} setSignedUp={setSignedUp}/>}
                    {signedUp && (
                        <Navigation colorScheme={colorScheme} />
                    )}
                    <StatusBar />
                </CurrentUser.Provider>
            </SafeAreaProvider>
        );
    }
}

export default withAuthenticator(App);
