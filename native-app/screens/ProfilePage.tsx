import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';

import { ProfileData } from '../components/ProfileData';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { StatsScreen } from '../components/StatsScreen';
import { AvatarScreen } from './AvatarScreen';
import { useRegisteredUser } from '../context/Context';
import { avatarInfo } from '../utils/avatarInfo';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const { currentUser } = useRegisteredUser();
  const avatar = Number(currentUser.avatar_uri)

  const [myAvatar, setMyAvatar] = useState(avatarInfo[avatar].image)

  useEffect(() => {
		setMyAvatar(avatarInfo[avatar].image)
	}, [currentUser.avatar_uri])

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
      <ScrollView style={styles.scroll}>
        <View style={styles.separator}/>
        <ProfileData/>
        <View style={styles.separator}/>
        <AvatarScreen myAvatar={myAvatar}/>
        <View style={styles.separator}/>
        <StatsScreen/>
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
