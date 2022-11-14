import React from 'react'
import { View, Image, StyleSheet, Text } from 'react-native' 

export function ProfileInfo() {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: 'https://picsum.photos/200/300'}}/> 
            <View>
                <Text>Name: Placeholder</Text>
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
  