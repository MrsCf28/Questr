import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';

import { ProfileData } from '../components/ProfileData';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { StatsScreen } from '../components/StatsScreen';
import { AvatarScreen } from './AvatarScreen';
import { useRegisteredUser } from '../context/Context';

const Knight = require('../assets/images/knight.png')
const DeathKnight = require('../assets/images/deathknight.png')
const Jester = require('../assets/images/Jester.png')
const Bard = require('../assets/images/Bard.png')
const BlackSmith = require('../assets/images/blacksmith.png')
const King = require('../assets/images/king.png')
const Mage = require('../assets/images/mage.png')
const ManAtArms = require('../assets/images/manAtArms.png')
const Princess = require('../assets/images/Princess.png')
const Elf = require('../assets/images/elfknight.png')

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const { currentUser } = useRegisteredUser();
  const avatar = Number(currentUser.avatar_uri)

  const [avatarArray, setAvatarArray] = useState([{id:0, image: Bard, cost: 100}, {id:1, image: Jester, cost: 200}, {id:2, image: BlackSmith, cost: 300}, {id:3, image: Knight, cost: 400}, {id:4, image: ManAtArms, cost: 500}, {id:5, image: Mage, cost: 600}, {id:6, image: Elf, cost: 700}, {id:7, image: Princess, cost: 800}, {id:8, image: King, cost: 900}, {id:9, image: DeathKnight, cost: 1000}])
  const [myAvatar, setMyAvatar] = useState(avatarArray[avatar].image)

  useEffect(() => {
		setMyAvatar(avatarArray[avatar].image)
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
