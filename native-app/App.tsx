import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify, API, graphqlOperation, Auth } from "aws-amplify";
import { withAuthenticator } from 'aws-amplify-react-native';
// import { withAuthenticator } from '@aws-amplify/ui-react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { CurrentQuest } from './context/CurrentQuest';
import { listQuestApis } from './src/graphql/queries';
// import '@aws-amplify/ui-react/styles.css';

import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

function App() {
  


  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme(); 

  const [currentQuest, setCurrentQuest] = useState(null)
  const [allQuests, setAllQuests] = useState([])
  
  useEffect(() => {
    fetchAllQuests();
  }, []);

  async function fetchAllQuests() {
    try {
      const questData = await API.graphql(graphqlOperation(listQuestApis));
      console.log(questData, "<<questData")
      const questList = questData.data.listQuestApis.items;
      console.log(questList, "<< questList");
      setAllQuests(questList);
    } catch (err) {
      console.log("ERROR: ", err)
    }
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <CurrentQuest.Provider value={{currentQuest, setCurrentQuest}}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </CurrentQuest.Provider>
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);