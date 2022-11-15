import { Auth } from 'aws-amplify';
import React from 'react'
import {View, Pressable, StyleSheet, Text} from 'react-native'


export function ProfileController() {

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={() => Auth.signOut()}>
                <Text style={styles.text}> Sign out</Text>
            </Pressable>
            <Pressable style={styles.button}>
                <Text style={styles.text}>Edit Profile</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 20,
    },
    button: {
        margin: 10,
        backgroundColor: 'blue',
        padding: 10,
        color: 'white',
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white'
    }
  });
  