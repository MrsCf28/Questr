import React, {useContext} from "react";
import { Pressable, StyleSheet, ImageBackground } from "react-native";
import { useNavigation, usePreventRemoveContext } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { CurrentUser } from "../context/CurrentUser";
import { patchUser } from "../utils/userApi";

export default function AcceptQuestScreen({route}) {
  const navigation = useNavigation();

  const {currentUser, setCurrentUser} = useContext(CurrentUser)

  const quest = route.params

  function acceptQuest() {
    setCurrentUser({...currentUser, current_quest_id: quest.id})
    
    const updatedUser = {
      id: currentUser.id,
      display_name: currentUser.display_name,
      age: currentUser.age,
      preferred_region: currentUser.preferred_region,
      image: currentUser.image,
      current_quest_id: quest.id,
      quest_history: currentUser.quest_history,
      avatar_uri: currentUser.avatar_uri,
      stats: currentUser.stats
    };

    patchUser(updatedUser).then(() => {
    }).catch((err: any) => {
      
      console.log("error in patch user", err);
    });
    navigation.navigate('TabTwo')
    
  }

  return (
  <View style={styles.main}>
      <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
        <ImageBackground source={require('../assets/images/bigScroll.png')} resizeMode="cover" style={styles.scroll}>
          <View style={styles.holder}>
            <Text style={styles.title}>{quest.title}</Text>
            <View style={styles.container}>
              <Text style={styles.text}>Quest Type: {quest.category}</Text>
              <Text>Time Limit: {quest.time_limit_hours} hr</Text>
            </View>
            <View style={styles.container}>
              <Text>{quest.rewards.coins} Coins {quest.rewards.xp}XP</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.text}>{quest.description}</Text>
            </View>
            <Pressable
              style={styles.button}
              onPress={acceptQuest}>
              <Text style={styles.buttonText}>Accept Quest</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: "100%",
      justifyContent: 'center',
      backgroundColor: 'none'
    },
    main: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    scroll: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    holder: {
      flex: 1,
      paddingHorizontal: 40,
      paddingVertical: 120,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'none'
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    buttonContainer: {
      alignItems: "center",
      width: "100%",
      backgroundColor: 'none'
    },
    button: {
      margin: 20,
      width: "80%",
      borderColor: '#7a7877',
      backgroundColor: '#014c54',
      padding: 10,
      color: "white",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3
    },
    buttonText: {
      color: "white",
    },
    text: {
      textTransform: "capitalize",
      textAlign: 'center'
    }
  });

