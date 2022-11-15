import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify, API, graphqlOperation, Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { CurrentQuest } from './context/CurrentQuest';
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

    const [currentQuest, setCurrentQuest] = useState(null);
    const [allQuests, setAllQuests] = useState([]);

    useEffect(() => {
        //fetchAllQuests();
        fetchQuestById();
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

    async function fetchQuestById() {
      try {
        const trialQuest = await API.graphql(
          graphqlOperation(getQuestApi, {id:"3"})
        );
        console.log(trialQuest.data.getQuestApi)
      } catch (err) {
        console.log('ERROR fetching questById: ', err);
    }
    }

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <CurrentQuest.Provider
                    value={{ currentQuest, setCurrentQuest }}
                >
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </CurrentQuest.Provider>
            </SafeAreaProvider>
        );
    }
}

export default withAuthenticator(App);
