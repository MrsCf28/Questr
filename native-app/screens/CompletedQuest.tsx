import React from "react";
import { StyleSheet } from "react-native";

import {
  TouchableOpacity,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "../components/Themed";
import { patchUser } from "../utils/userApi";
import { useCurrentUser, useRegisteredUser } from "../context/Context";
import Votes from "../components/Votes";
export default function CompletedQuestScreen({ route }: any) {
  const { setCurrentUser } = useCurrentUser();
  const { currentUser } = useRegisteredUser();
  const navigation = useNavigation();

  let { currentQuest } = route.params;

  const quest = currentQuest;
  function updateUserStats() {
    let currentStats = { ...currentUser.stats };
    let updatedHistory = {
      quest_id: String(quest.id),
      quest_title: quest.title,
      completed_status: "complete",
      start_time: String(Date.now()),
    };

    Object.keys(currentStats).forEach((stat) => {
      currentStats[stat] += quest.rewards[stat];
    });

    const updatedUser = {
      id: currentUser.id,
      current_quest_id: "0",
      quest_history: [...currentUser.quest_history, updatedHistory],
      stats: currentStats,
    };

    patchUser(updatedUser)
      .then((user) => {
        setCurrentUser(user);
        console.log("patched completed quest");
        navigation.navigate("TabOne", { screen: "Home" });
      })
      .catch((err: any) => {
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

            <Text style={styles.title}>
              The lord has bestowed upon thou many gifts for your troubles.
            </Text>

            <View style={styles.container}>
              <View style={styles.statContainer}>
                <View style={styles.iconContainer}>
                  <Text style={styles.stat}>coins</Text>
                  <Image
                    source={require("../assets/videos/coins.gif")}
                    style={styles.icon}
                  />
                  <View style={styles.statbox}>
                    <Text style={styles.num}>{currentUser.stats.coins}</Text>
                    <Text style={styles.numAdd}>(+{quest.rewards.coins})</Text>
                  </View>
                </View>

                <View style={styles.iconContainer}>
                  <Text style={styles.stat}>XP</Text>
                  <Image
                    source={require("../assets/videos/xp.gif")}
                    style={styles.icon}
                  />
                  <View style={styles.statbox}>
                    <Text style={styles.num}>{currentUser.stats.xp}</Text>
                    <Text style={styles.numAdd}>(+{quest.rewards.xp})</Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.stat}>dexterity</Text>
                  <Image
                    source={require("../assets/images/1_dex.png")}
                    style={styles.icon}
                  />
                  <View style={styles.statbox}>
                    <Text style={styles.num}>
                      {currentUser.stats.dexterity}
                    </Text>
                    <Text style={styles.numAdd}>
                      (+{quest.rewards.dexterity})
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.stat}>exploration</Text>
                  <Image
                    source={require("../assets/images/1_exp.png")}
                    style={styles.icon}
                  />
                  <View style={styles.statbox}>
                    <Text style={styles.num}>
                      {currentUser.stats.exploration}
                    </Text>
                    <Text style={styles.numAdd}>
                      (+{quest.rewards.exploration})
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.stat}>perception</Text>
                  <Image
                    source={require("../assets/images/1_per.png")}
                    style={styles.icon}
                  />
                  <View style={styles.statbox}>
                    <Text style={styles.num}>
                      {currentUser.stats.perception}
                    </Text>
                    <Text style={styles.numAdd}>
                      (+{quest.rewards.perception})
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.stat}>stamina</Text>
                  <Image
                    source={require("../assets/images/1_sta.png")}
                    style={styles.icon}
                  />
                  <View style={styles.statbox}>
                    <Text style={styles.num}>{currentUser.stats.stamina}</Text>
                    <Text style={styles.numAdd}>
                      (+{quest.rewards.stamina})
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.stat}>strength</Text>
                  <Image
                    source={require("../assets/images/1_str.png")}
                    style={styles.icon}
                  />
                  <View style={styles.statbox}>
                    <Text style={styles.num}>{currentUser.stats.strength}</Text>
                    <Text style={styles.numAdd}>
                      (+{quest.rewards.strength})
                    </Text>
                  </View>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.stat}>wisdom</Text>
                  <Image
                    source={require("../assets/images/1_wis.png")}
                    style={styles.icon}
                  />
                  <View style={styles.statbox}>
                    <Text style={styles.num}>{currentUser.stats.wisdom}</Text>
                    <Text style={styles.numAdd}>(+{quest.rewards.wisdom})</Text>
                  </View>
                </View>
              </View>
              <Pressable
                style={[styles.button]}
                onPress={() => updateUserStats()}
              >
                <Text style={styles.buttonText}>Claim Rewards</Text>
              </Pressable>
              <Votes currentQuest={currentQuest} />
            </View>
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
    width: "105%",
    justifyContent: "center",
    backgroundColor: "none",
    // borderColor: "black",
    //borderWidth: 1,
    padding: 0,
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
    paddingVertical: 140,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "none",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    margin: 0,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    backgroundColor: "none",
  },
  button: {
    margin: 10,
    width: "100%",
    borderColor: "#7a7877",
    backgroundColor: "#014c54",
    borderWidth: 3,
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    //borderColor: "purple",
    //borderWidth: 1,
    flexBasis: "40%",
    padding: 0,
    margin: 0,
  },
  stat: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#014c54",
    fontStyle: "celandine",
  },
  icon: {
    backgroundColor: "transparent",
    resizeMode: "contain",
    height: 35,
    width: 35,
    marginTop: 10,
    marginBottom: 10,
    margin: 5,
    flexDirection: "column",
    justifyContent: "center",
  },
  xpGoldContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "none",
  },
  statContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "none",
    flexWrap: "wrap",
  },
  statbox: {
    flex: 0,
    backgroundColor: "transparent",
    flexDirection: "column",
    alignContent: "space-around",
    justifyContent: "center",
  },
  num: {
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    color: "#014c54",
    alignContent: "center",
  },
  numAdd: {
    marginLeft: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5,
    alignContent: "center",
    color: "#01803a",
  },
});
