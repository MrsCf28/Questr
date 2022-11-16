import React, {useContext} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import TabOneScreen from '../screens/ProfilePage';
import CurrentQuestScreen from '../screens/CurrentQuestScreen';
import NoQuestScreen from '../screens/NoQuestScreen';
import { CurrentUser } from '../context/CurrentUser';

const TopTab = createMaterialTopTabNavigator();



export function TopTabs() {

    const {currentUser} = useContext(CurrentUser)

    return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <TopTab.Navigator>
        <TopTab.Screen name="Home" component={TabOneScreen} />
        <TopTab.Screen name="History" component={TabOneScreen} />
        <TopTab.Screen name="CurrentQuest" component={currentUser.currentQuest ? CurrentQuestScreen : NoQuestScreen} />
      </TopTab.Navigator>
      <StatusBar />
    </SafeAreaView>  
    );
  }