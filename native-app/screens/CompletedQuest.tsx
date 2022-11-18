import React, {useContext} from 'react'
import { StyleSheet, Button, TextInput } from "react-native";

import { Pressable, ImageBackground } from "react-native";
import {
  useNavigation,
  usePreventRemoveContext,
} from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { useEffect } from "react";
import { patchUser } from '../utils/userApi';
import { CurrentUser } from '../context/CurrentUser';

export default function CompletedQuestScreen({ route }) {
  const navigation = useNavigation();

  let { currentQuest, currentUser } = route.params;

  const {setCurrentUser} = useContext(CurrentUser)
  


  const quest = currentQuest;
  function updateUserStats() {
    let currentStats = { ...currentUser.stats };
    // let currentHistory = [...currentUser. currentQuest];
    
    
    Object.keys(currentStats).forEach((stat) => {
      currentStats[stat] += quest.rewards[stat];
    });
    //had to do like this as patch requires some fields but not all
    const updatedUser = {
      id: currentUser.id,
      display_name: currentUser.display_name,
      age: currentUser.age,
      preferred_region: currentUser.preferred_region,
      image: currentUser.image,
      current_quest_id: currentUser.current_quest_id,
      quest_history: currentUser.quest_id,
      avatar_uri: currentUser.avatar_uri,
      stats: currentStats,
      //quest history needs work graphQL wants weird inputs and not the useful ones can we edit??
    };

    setCurrentUser({...currentUser, stats: currentStats, current_quest_id: '0'})

    patchUser(updatedUser).then(() => {
      console.log('patched')
      navigation.navigate("TabOne", {screen: 'Home'})
    }).catch((err: any) => {
      
      console.log("error in patch user", err);
    });
    
  }

  // useEffect(() => {
  //   updateUserStats();
  // }, []);

  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../assets/images/stones.jpg")}
        style={styles.container}
        resizeMode="cover"
      >
        <ImageBackground
          source={require("../assets/images/bigScroll.png")}
          resizeMode="cover"
          style={styles.scroll}
        >
          <View style={styles.holder}>
            <Text style={styles.title}>
              Congratulations you completed {quest.title}
            </Text>
            <View style={styles.container}>
              <Text style={styles.title}>
                The lord has bestowed up thou many gifts for your troubles.
              </Text>
            </View>
            <View style={styles.container}>
              <Text>
                {quest.rewards.coins} coins {quest.rewards.xp}XP
              </Text>
              <Text>dexterity + {quest.rewards.dexterity}</Text>
              <Text>exploration + {quest.rewards.exploration}</Text>
              <Text>perception + {quest.rewards.exploration}</Text>
              <Text>stamina + {quest.rewards.stamina}</Text>
              <Text>strength + {quest.rewards.strength}</Text>
              <Text>wisdom + {quest.rewards.wisdom}</Text>
            </View>
            <Pressable style={[styles.button]} onPress={() => updateUserStats()}>
                <Text style={styles.buttonText}>Claim Rewards</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "none",
  },
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  holder: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 120,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "none",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "none",
  },
  button: {
    margin: 20,
    width: "80%",
    borderColor: "#7a7877",
    backgroundColor: "#014c54",
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  buttonText: {
    color: "white",
  },
});
