import React, {useState, useContext} from "react";
import { View, StyleSheet, Text, ImageBackground, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CurrentUser } from "../context/CurrentUser";
import { patchUser } from '../utils/userApi';

interface tabProp {
  selectedTab: string;
}

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

export function AvatarSelector() {


    
    const navigation = useNavigation();

    const {setCurrentUser, currentUser} = useContext(CurrentUser)
    const [avatarArray, setAvatarArray] = useState([{id:0, image: Bard, cost: 100}, {id:1, image: Jester, cost: 200}, {id:2, image: BlackSmith, cost: 300}, {id:3, image: Knight, cost: 400}, {id:4, image: ManAtArms, cost: 500}, {id:5, image: Mage, cost: 600}, {id:6, image: Elf, cost: 700}, {id:7, image: Princess, cost: 800}, {id:8, image: King, cost: 900}, {id:9, image: DeathKnight, cost: 1000}])
    const [currentAvatar, setCurrentAvatar] = useState(0)

    //can this array exsit on the user??

    const {coins} = currentUser.stats
    // working on this to check if avatar exists in bought array
    function avatarChecker() {
      if(currentUser.owned_avatar_ids.some((avatar) => avatar === avatarArray[currentAvatar].id)) {
        return true
      } else {
        return false
      }
    }

    function next() {
      if(currentAvatar === 9) {
        setCurrentAvatar(0)
      } else {
        setCurrentAvatar((current) => current + 1)
      }
    }

    function previous() {
      if(currentAvatar === 0) {
        setCurrentAvatar(9)
      } else {
        setCurrentAvatar((current) => current - 1)
      }  
    }

    function select() {
        
      setCurrentUser({...currentUser, avatar_uri: `${currentAvatar}` })

      const updatedUser = {
        id: currentUser.id,
        display_name: currentUser.display_name,
        age: currentUser.age,
        preferred_region: currentUser.preferred_region,
        image: currentUser.image,
        current_quest_id: currentUser.current_quest_id,
        quest_history: currentUser.quest_history,
        avatar_uri: `${currentAvatar}`,
        stats: currentUser.stats
      };
      patchUser(updatedUser).then(() => {
        console.log('patched')
      }).catch((err: any) => {
        
        console.log("error in patch user", err);
      });
        navigation.goBack()
    }


    function buy() {

      const newBoughtAvatars = [...currentUser.owned_avatar_ids, avatarArray[currentAvatar].id]
      const newStats = {...currentUser.stats, coins: currentUser.stats.coins - avatarArray[currentAvatar].cost}

      setCurrentUser({...currentUser, owned_avatar_ids: newBoughtAvatars, stats: newStats })

      const updatedUser = {
        id: currentUser.id,
        age: currentUser.age,
        current_quest_id: currentUser.current_quest_id,
        stats: newStats,
        owned_avatar_ids: newBoughtAvatars
      };

      patchUser(updatedUser).then(() => {
        console.log('patched')
      }).catch((err: any) => {
        
        console.log("error in patch user", err);
      });
    }

  return (
    <View
      style={[
        styles.container,
      ]}>
        <ImageBackground source={require('../assets/images/wood.jpg')} style={styles.background} resizeMode="cover">
            <View style={[styles.holder]}>
                <View style={styles.frame}>
                <Image style={styles.image} resizeMode='contain' source={avatarArray[currentAvatar].image}/>
                </View>
            </View>
            <View style={{flexDirection: 'row', width: '90%'}}>
              <View style={styles.plaque}>
                  {!avatarChecker()? <Text style={styles.text}>{avatarArray[currentAvatar].cost} Gold</Text> : <Text style={styles.text}>Owned</Text>}
              </View>
              <Pressable disabled={avatarChecker() || coins < avatarArray[currentAvatar].cost} style={[styles.button, avatarChecker() || coins < avatarArray[currentAvatar].cost? styles.disabledButton : null]} onPress={buy}>
                {/* will disable and turn red if owned */}
                  <Text style={styles.text}>Buy</Text>
              </Pressable>
            </View>

            <View style={[styles.holder, {flex:1, flexDirection: 'row'}]}>
            <Pressable style={styles.button} onPress={previous}>
                    <Text style={styles.text}>Previous</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={next}>
                    <Text style={styles.text}>Next</Text>
                </Pressable>
            </View>
            <View style={styles.selectButton}>
              {/* will enable and turn green if owned */}
                <Pressable disabled={!avatarChecker()} style={[styles.button, {width: '50%'}, avatarChecker()? null : styles.disabledButton]} onPress={select}>
                    <Text style={styles.text}>Select</Text>
                </Pressable>
            </View>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    background: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    frame: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: '#d4d4d4',
      backgroundColor: '#292936',
      borderRadius: 20,
      marginRight: 10,
    },
    holder: {
      flex:8,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      alignItems: "center",
      padding: 5,
    },
    text: {
      fontWeight: 'bold',
      lineHeight: 30,
      color: '#d4d4d4'
    },
    button: {
        margin: 5,
        padding: 5,
        color: "white",
        borderRadius: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
      },
    selectButton: {
        flex:1, 
        width: '100%', 
        justifyContent:'center',
        alignItems: 'center'
    },
    plaque: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#d4d4d4',
        backgroundColor: '#292936',
        borderRadius: 20,
        padding: 5,
    },
    disabledButton: {
      backgroundColor: '#4a040c'
    }
  });