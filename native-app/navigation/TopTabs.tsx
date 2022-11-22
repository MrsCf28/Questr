import React, {useContext} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import TabOneScreen from '../screens/ProfilePage';
import CurrentQuestScreen from '../screens/CurrentQuestScreen';
import NoQuestScreen from '../screens/NoQuestScreen';
import { HistoryScreen } from '../components/HistoryScreen';
import { useRegisteredUser } from '../context/Context';

const TopTab = createMaterialTopTabNavigator();



export function TopTabs() {

  const { currentUser } = useRegisteredUser();

    return (
    <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
      <TopTab.Navigator
      initialRouteName="Home">
        <TopTab.Screen name="Home" component={TabOneScreen} />
        <TopTab.Screen name="History" component={HistoryScreen} />
        <TopTab.Screen name="CurrentQuest" component={currentUser.current_quest_id !=='0' ? CurrentQuestScreen : NoQuestScreen} />
      </TopTab.Navigator>
      <StatusBar />
    </SafeAreaView>  
    );
  }