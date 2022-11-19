import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, ImageBackground, TextInput, Image } from "react-native";
import { Text, View } from "../Themed";
import { CurrentUser } from "../../context/CurrentUser";
import { patchUser } from "../../utils/userApi";

const Knight = require('../../assets/images/knight.png')
const DeathKnight = require('../../assets/images/deathknight.png')
const Jester = require('../../assets/images/Jester.png')
const Bard = require('../../assets/images/Bard.png')
const BlackSmith = require('../../assets/images/blacksmith.png')
const King = require('../../assets/images/king.png')
const Mage = require('../../assets/images/mage.png')
const ManAtArms = require('../../assets/images/manAtArms.png')
const Princess = require('../../assets/images/Princess.png')
const Elf = require('../../assets/images/elfknight.png')

const Bandit = require('../../assets/images/enemybandit.png')
const Bruiser = require('../../assets/image/enemybruiser.png')
const EvilKnight = require('../../assets/image/enemyknight.png')
const EvilMage = require('../../assets/image/enemymage.png')

export default function BattleQuest () {

    const {currentUser} = useContext(CurrentUser)
    const avatar = Number(currentUser.avatar_uri)
  
    const [avatarArray, setAvatarArray] = useState([{id:0, image: Bard, cost: 100}, {id:1, image: Jester, cost: 200}, {id:2, image: BlackSmith, cost: 300}, {id:3, image: Knight, cost: 400}, {id:4, image: ManAtArms, cost: 500}, {id:5, image: Mage, cost: 600}, {id:6, image: Elf, cost: 700}, {id:7, image: Princess, cost: 800}, {id:8, image: King, cost: 900}, {id:9, image: DeathKnight, cost: 1000}])
    const [myAvatar, setMyAvatar] = useState(avatarArray[avatar].image)
  
    useEffect(() => {
          setMyAvatar(avatarArray[avatar].image)
      }, [currentUser.avatar_uri])

    return (
        <View style={styles.main}>
            <ImageBackground source={require('../../assets/images/stones.jpg')} style={styles.main} resizeMode="cover">           
                <View style={styles.containerRow}>
                    <Image source={myAvatar} style={styles.myAvatar}>

                    </Image>
                    <Image source={Bandit} style={styles.enemyAvatar}>
                        
                    </Image>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    containerRow: {
        alignItems: 'center',
        width: "100%",
        justifyContent: 'center',
        backgroundColor: 'none',
        flexDirection: 'row'
    },
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: '100%'
    },
    myAvatar: {
        position: 'absolute',
        left: '-50%',
        width: '105%',
    },
    enemyAvatar: {
        position: 'absolute',
        right: '-30%',
        width: '105%',
    }
  })