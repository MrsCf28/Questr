import React from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
import { ChangeAvatar } from "../components/ChangeAvatar";
import { ProfileController } from "../components/ProfileController";
interface tabProp {
  selectedTab: string;
}

export function AvatarScreen({ setMyAvatar, myAvatar }: tabProp) {
  return (
    <View
      style={[
        styles.container,
      ]}>
        <ImageBackground source={require('../assets/images/wood.jpg')} style={styles.background} resizeMode="cover">
          <View style={styles.holder}>
            <View style={styles.frame}>
              <Image style={styles.image} resizeMode='contain' source={myAvatar}/>
            </View>
            <View>
              <Text style={styles.text}>Stamina: 8</Text>
              <Text style={styles.text}>Exploration: 4</Text>
              <Text style={styles.text}>Perception: 6</Text>
              <Text style={styles.text}>Dexterity: 8</Text>
              <Text style={styles.text}>Wisdom: 14</Text>
              <Text style={styles.text}>Strength: 14</Text>
            </View>  
          </View>
          <ChangeAvatar setMyAvatar={setMyAvatar}/>
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
    borderWidth: 6,
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
    height: 300,
    marginRight: 10,
  },
  holder: {
    flex:1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    padding: 5,
  },
  hidden: {
    display: "none",
  },
  text: {
    fontWeight: 'bold',
    lineHeight: 30,
    color: '#d4d4d4'
  }
});