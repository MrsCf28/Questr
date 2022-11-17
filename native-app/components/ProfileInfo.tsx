import React from 'react'
import { useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native' 
import { CurrentUser } from '../context/CurrentUser';

export function ProfileInfo() {

    const {currentUser} = useContext(CurrentUser)

    const {image} = currentUser

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:image}}/> 

            <View style={styles.holder}>
                <Text style={styles.title}>{currentUser.display_name}</Text>
                <Text style={styles.text}>Rank: BigDaddy</Text>
                <View style={styles.flexRow}>
                  <Text style={styles.text}>XP: 100      </Text>
                  <Text style={styles.text}>Coins: 10</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
    holder: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      paddingHorizontal: 50,
      borderWidth: 3,
      borderColor: '#d4d4d4',
      backgroundColor: '#292936',
      borderRadius: 20,
    },
    title: {
      fontWeight: 'bold',
      color: '#d4d4d4'
    },
    text : {
      color: '#d4d4d4'
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 100,
        margin: 10,
        borderWidth: 5,
        borderColor: '#d4d4d4',
    },
    flexRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flex: 1
    }
  });
  