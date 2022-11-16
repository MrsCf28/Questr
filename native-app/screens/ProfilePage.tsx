import React, {useState} from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { ProfileController } from '../components/ProfileController';
import { ProfileData } from '../components/ProfileData';
import { ProfileInfo } from '../components/ProfileInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { StatsScreen } from '../components/StatsScreen';
import { ItemsScreen } from '../components/ItemsScreen';
import { AvatarScreen } from './AvatarScreen';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [selectedTab, setSelectedTab] = useState<string>("stats");

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProfileInfo/>
        <ProfileController/>
        <AvatarScreen selectedTab={selectedTab}/>
        <StatsScreen selectedTab={selectedTab} />
        <ItemsScreen selectedTab={selectedTab} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
