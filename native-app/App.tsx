import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { CurrentQuest } from './context/CurrentQuest';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme(); 

  const [currentQuest, setCurrentQuest] = useState(null)

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