import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, ImageBackground, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

export function AvatarSelector({route}) {

  useEffect(() => {
    
  }, [])

    const navigation = useNavigation();
    const setMyAvatar = route.params

    const [avatarArray, setAvatarArray] = useState([{image: Bard, cost: 'Owned'}, {image: Jester, cost: 200}, {image: BlackSmith, cost: 300}, {image: Knight, cost: 400}, {image: ManAtArms, cost: 500}, {image: Mage, cost: 600}, {image: Elf, cost: 700}, {image: Princess, cost: 800}, {image: King, cost: 900}, {image: DeathKnight, cost: 1000}])
    const [currentAvatar, setCurrentAvatar] = useState(0)

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
        setMyAvatar(avatarArray[currentAvatar].image)
        navigation.goBack()
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
            <View style={styles.plaque}>
                <Text style={styles.text}>{avatarArray[currentAvatar].cost} Gold</Text>
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
                <Pressable style={[styles.button, {width: '50%'}]} onPress={select}>
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 100,
        padding: 5,
        borderWidth: 3,
        borderColor: '#d4d4d4',
        backgroundColor: '#292936',
        borderRadius: 20,
    }
  });