import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { CurrentUser } from "../context/CurrentUser";

export default function CurrentQuestScreen() {

  const {currentUser} = useContext(CurrentUser)

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{currentUser.currentQuest.title}</Text>
      <View style={styles.container}>
        <Text>{currentUser.currentQuest.category}</Text>
        <Text>Time Limit: {currentUser.currentQuest.timeLimit}</Text>
      </View>
      <View style={styles.container}>
        <Text>{currentUser.currentQuest.rewards.coins} coins {currentUser.currentQuest.rewards.xp}XP</Text>
      </View>
      <Text>{currentUser.currentQuest.description}</Text>
      <View style={styles.container}>
        {currentUser.currentQuest.questObjectives.map((objective:string) => {
          return <Text key={objective}>{objective}</Text>
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text>Submit Quest Update</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.sos]}>
          <Text>SOS</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.cancel]}>
          <Text>Cancel Quest</Text>
        </Pressable>
      </View>
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
  buttonContainer: {
    alignItems: "center",
    width: "100%",
  },
  button: {
    margin: 20,
    width: "80%",
    backgroundColor: "green",
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sos: {
    backgroundColor: "red",
  },
  cancel: {
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
  },
});
