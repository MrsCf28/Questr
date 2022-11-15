import React from 'react'
import { useContext } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native' 
import { CurrentUser } from '../context/CurrentUser';

export function ProfileInfo() {

    const {currentUser} = useContext(CurrentUser)

    const {image} = currentUser

    console.log(image)

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:image}}/> 
            <View>
                <Text>Name: {currentUser.user}</Text>
                <Text>Rank: BigDaddy</Text>
                <Text>XP: 100</Text>
                <Text>Coins: 10</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 2,
      flexDirection: 'row',
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
    image: {
        height: 150,
        width: 150,
        borderRadius: 100,
        margin: 10,
    }
  });
  