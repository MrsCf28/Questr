import React, {useState} from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { ProfileController } from '../components/ProfileController';
import { ProfileData } from '../components/ProfileData';
import { ProfileInfo } from '../components/ProfileInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { StatsScreen } from '../components/StatsScreen';
import { ItemsScreen } from '../components/ItemsScreen';
import { AvatarScreen } from './AvatarScreen';

const Knight = require('../assets/images/knight.png')
const DeathKnight = require('../assets/images/deathknight.png')

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [selectedTab, setSelectedTab] = useState<string>("stats");
  const [myAvatar, setMyAvatar] = useState(Knight)

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
      <ScrollView style={styles.scroll}>
        <View style={styles.separator}/>
        <ProfileData/>
        <View style={styles.separator}/>
        <AvatarScreen setMyAvatar={setMyAvatar} myAvatar={myAvatar}/>
        <View style={styles.separator}/>
        <StatsScreen selectedTab={selectedTab} />
        <View style={styles.separator}/>
      </ScrollView>
      </ImageBackground>
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
    width: '80%',
  },
  scroll:{
    paddingHorizontal: 20
  }
});
