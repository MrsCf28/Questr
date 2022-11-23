import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { useRegisteredUser } from "../context/Context";

export function ProfileInfo() {
  const { currentUser } = useRegisteredUser();
  const { display_name, image, stats } = currentUser;

  const ranks: string[] = [
    "ToddlerTime",
    "LilPete",
    "AdolescentAlex",
    "WiseWolfred",
    "Knight",
  ];

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />

      <View style={styles.holder}>
        <Text style={styles.title}>{display_name}</Text>
        <Text style={styles.text}>
          Rank:{" "}
          {stats.xp >= ranks.length * 100
            ? ranks[ranks.length - 1]
            : ranks[Math.floor(stats.xp / 100)]}
        </Text>

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Text style={styles.stat}>{stats.coins}</Text>
            <Image
              source={require("../assets/images/gold.png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.iconContainer}>
            <Text style={styles.stat}>{stats.coins}</Text>
            <Image
              source={require("../assets/images/xppng.png")}
              style={styles.icon}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    borderColor: "yellow",
    borderWidth: 2,
  },
  holder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingHorizontal: 50,
    borderWidth: 3,
    borderColor: "#d4d4d4",
    backgroundColor: "#292936",
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    color: "#d4d4d4",
  },
  text: {
    color: "#d4d4d4",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100,
    margin: 10,
    borderWidth: 5,
    borderColor: "#d4d4d4",
  },
  flexRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "none",
    position: "absolute",
  },
  icon: {
    backgroundColor: "transparent",
    resizeMode: "contain",
    height: 35,
    width: 35,
  },
  iconContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",

    position: "absolute",
    top: 0,
    right: 0,
  },
  stat: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "gold",
  },
});
