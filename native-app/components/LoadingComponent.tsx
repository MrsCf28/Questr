import React from "react";
import { StyleSheet, Image } from "react-native";
import { View } from "../components/Themed";

export default function LoadingComponent() {

    return (
    <View style={styles.loadContainer}>
        <Image
        style={styles.imageLoading}
        source={require("../assets/videos/loadingScroll.gif")}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    loadContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    imageLoading: {
      borderColor: "black",
      flex: 1,
      width: "100%",
    },
  });
  