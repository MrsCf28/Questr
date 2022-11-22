
import { Auth } from 'aws-amplify';
import React from 'react'
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native'
import {
  useNavigation,
} from "@react-navigation/native";


export function ProfileController() {
const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => Auth.signOut()}>
                <Text style={styles.text}> Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate("EditProfile")}>
                <Text style={styles.text}>Edit Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
  },
  button: {
    margin: 10,
    padding: 10,
    color: "white",
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: '#7a7877',
    backgroundColor: '#014c54',
  },
  text: {
    color: "white",
  },
});
