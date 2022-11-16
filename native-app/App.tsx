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
    const [allQuests, setAllQuests] = useState([]);
    const [id, setId] = useState('1');

    useEffect(() => {
        //fetchAllQuests();
        setCurrentUser(currentUser => {
            return {
                ...currentUser,
                user: Auth.user.attributes.email,
            };
        });
        fetchQuestById(id);
    }, []);

    async function fetchAllQuests() {
        try {
            const questData = await API.graphql(
                graphqlOperation(listQuestApis)
            );
            const questList = questData.data.listQuestApis.items;
            setAllQuests(questList);
        } catch (err) {
            console.log('ERROR fetching questLists: ', err);
        }
    }

    async function fetchQuestById(id: string) {
        try {
            const trialQuest = await API.graphql(
                graphqlOperation(getQuestApi, { id: id })
            );
            console.log(trialQuest.data.getQuestApi);
        } catch (err) {
            console.log('ERROR fetching questById: ', err);
        }
    }

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <CurrentUser.Provider
                    value={{ currentUser, setCurrentUser }}
                >
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </CurrentUser.Provider>
            </SafeAreaProvider>
        );
    }
}

export default withAuthenticator(App);
