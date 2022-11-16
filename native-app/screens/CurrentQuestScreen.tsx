import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { CurrentUser } from "../context/CurrentUser";

export default function CurrentQuestScreen() {
  const navigation = useNavigation();

  const { currentUser, setCurrentUser } = useContext(CurrentUser);

  const cancelQuest = () => {
    setCurrentUser({ ...currentUser, currentQuest: null });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.title}>{currentUser.currentQuest.title}</Text>
      <View style={styles.container}>
        <Text>{currentUser.currentQuest.category}</Text>
        <Text>Time Limit: {currentUser.currentQuest.time_limit_hours} hrs</Text>
      </View>
      <View style={styles.container}>
        <Text>
          {currentUser.currentQuest.rewards.coins} coins{" "}
          {currentUser.currentQuest.rewards.xp}XP
        </Text>
      </View>
      <Text>{currentUser.currentQuest.description}</Text>
      <View style={styles.container}>
        {currentUser.currentQuest.objectives.map((objective) => {
          return <Text key={objective.desc}>{objective.desc}</Text>;
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("CameraPage");
          }}
        >
          <Text>Submit Quest Update</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.sos]}>
          <Text>SOS</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.cancel]} onPress={cancelQuest}>
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
