import React from "react";
import { Text, View, StyleSheet } from "react-native";

//will need to format date to some thing actually readable

export function LeaderboardStatsCard({ user }) {
    console.log("user: ", user);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {user.display_name}
            </Text>
            {Object.entries(user.stats).map((stat) => {
                return (
                    <Text style={styles.text}>
                        {stat[0]}: {stat[1]}
                    </Text>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 10,
    padding:10,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#7a7877',
    backgroundColor: "#291403",
  },
  text: {
    color: 'white'
  }
});