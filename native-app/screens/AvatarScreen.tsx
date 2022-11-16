import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
interface tabProp {
  selectedTab: string;
}

export function AvatarScreen({ selectedTab }: tabProp) {
  return (
    <View
      style={[
        styles.container,
      ]}>
        <ImageBackground style={styles.image} source={require('../assets/images/knight.png')}>
          <View>
            <Text style={styles.text}>Stamina: 8</Text>
            <Text style={styles.text}>Exploration: 4</Text>
            <Text style={styles.text}>Perception: 6</Text>
            <Text style={styles.text}>Dexterity: 8</Text>
            <Text style={styles.text}>Wisdom: 14</Text>
            <Text style={styles.text}>Strength: 14</Text>
          </View>  
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  image: {
    width: '75%',
    flex: 1,
    justifyContent: 'center',
    alignItems: "flex-end",
    padding: 50,
  },
  hidden: {
    display: "none",
  },
  text: {
    fontWeight: 'bold',
    lineHeight: 30
  }
});