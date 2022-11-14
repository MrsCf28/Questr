import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "../components/Themed";

export default function AcceptQuestScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Slay a dragon</Text>
      <View style={styles.container}>
        <Text> Adventure</Text>
        <Text> Time Limit: 1hr</Text>
      </View>
      <View style={styles.container}>
        <Text> 10 coins 100XP</Text>
      </View>
      <View style={styles.container}>
        <Text>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          aliquam libero quis ipsum fringilla pretium. Cras condimentum augue
          sit amet lectus sodales efficitur. Sed in maximus eros. Nulla ac risus
          nec ligula aliquam lobortis vel quis mauris. Morbi pretium fermentum
          luctus. Mauris cursus nisi in dictum venenatis. Duis vitae odio
          consequat ante laoreet eleifend. Aenean tempus enim quis turpis porta,
          ut sodales nulla porta. Ut efficitur leo tortor, in facilisis urna
          ultrices sit amet. Etiam vestibulum malesuada luctus. Vestibulum nec
          molestie turpis. Proin ultrices ultricies mauris viverra tincidunt.
          Phasellus ut ultricies lorem, vel finibus justo. Aenean lectus diam,
          gravida id elementum ut, sodales eu metus.
        </Text>
        <View style={styles.container}>
          <Text> - Go to location</Text>
          <Text> - Take a photo of the dragon</Text>
        </View>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("CurrentQuest")}>
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
