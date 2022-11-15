import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify, API, graphqlOperation, Auth } from "aws-amplify";
import { withAuthenticator } from 'aws-amplify-react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { CurrentUser } from './context/CurrentUser';
import { listQuestApis } from './src/graphql/queries';

import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme(); 

  const [currentUser, setCurrentUser] = useState({user:null, image:'https://picsum.photos/200/300', currentQuest: null})
  const [allQuests, setAllQuests] = useState([])


  useEffect(() => {
    setCurrentUser(currentUser => {
      return {...currentUser, user: Auth.user.attributes.email}
    })
  }, [])
  // useEffect(() => {
  //   fetchAllQuests();
  // }, []);

  // async function fetchAllQuests() {
  //   try {
  //     const questData = await API.graphql(graphqlOperation(listQuestApis));
  //     console.log(questData, "<<questData")
  //     const questList = questData.data.listQuestApis.items;
  //     console.log(questList, "<< questList");
  //     setAllQuests(questList);
  //   } catch (err) {
  //     console.log("ERROR: ", err)
  //   }
  // }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <CurrentUser.Provider value={{currentUser, setCurrentUser}}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </CurrentUser.Provider>
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);