import React, {useContext} from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation, usePreventRemoveContext } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { CurrentUser } from "../context/CurrentUser";

export default function AcceptQuestScreen({route}) {
  const navigation = useNavigation();

  const {currentUser, setCurrentUser} = useContext(CurrentUser)

  const quest = route.params

  function acceptQuest() {
    setCurrentUser({...currentUser, currentQuest: quest})
    // navigation.navigate("CurrentQuest")
    navigation.navigate('TabOne', {screen:'CurrentQuest'})
  }

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{quest.title}</Text>
      <View style={styles.container}>
        <Text>{quest.category}</Text>
        <Text>Time Limit: {quest.timeLimit}</Text>
      </View>
      <View style={styles.container}>
        <Text>{quest.rewards.coins} coins {quest.rewards.xp}XP</Text>
      </View>
      <View style={styles.container}>
        <Text>{quest.description}</Text>
        <View style={styles.container}>
          {quest.questObjectives.map((objective:string) => {
            return <Text key={objective}>{objective}</Text>
          })}
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={acceptQuest}>
        <Text style={styles.buttonText}>Accept Quest</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  main: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    margin: 50,
    backgroundColor: "green",
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});
