import React, {useState} from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';

import { ProfileData } from '../components/ProfileData';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { StatsScreen } from '../components/StatsScreen';
import { AvatarScreen } from './AvatarScreen';

const Bard = require('../assets/images/Bard.png')

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [selectedTab, setSelectedTab] = useState<string>("stats");
  const [myAvatar, setMyAvatar] = useState(Bard)

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
  separator: {
    marginVertical: 30,
    width: '80%',
  },
  scroll:{
    paddingHorizontal: 20
  }
});
