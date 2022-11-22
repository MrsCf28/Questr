import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { patchQuest } from "../utils/questApi";
export default function Votes({ currentQuest }: any) {
  const [votes, setVotes] = useState(currentQuest.reviews["current_rating"]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  function like(ammount: number) {
    if (!liked) {
      let currentVotes = votes + ammount;
      setVotes(currentVotes);
      setLiked(true);
      setDisliked(false);
      const updatedQuest = { ...currentQuest };
      updatedQuest.reviews["current_rating"] = currentVotes;
      patchQuest(updatedQuest);
    }
  }
  function dislike(ammount: number) {
    if (!disliked) {
      let currentVotes = votes + ammount;
      setVotes(currentVotes);
      setDisliked(true);
      setLiked(false);
      const updatedQuest = { ...currentQuest };
      updatedQuest.reviews["current_rating"] = currentVotes;
      patchQuest(updatedQuest);
    }
  }

  if (liked || disliked) {
    return (
      <View style={styles.container}>
        <Text>{votes.toString()} Likes</Text>
        <View style={styles.buttonContainer}></View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>{votes.toString()} Likes</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => like(1)}
          style={styles.likeButton}>
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dislike(-1)}
          style={styles.dislikeButton}>
          <Text style={styles.buttonText}>Dislike</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
    backgroundColor: "none",
    height: 80,
  },
  likeButton: {
    margin: 20,
    width: "30%",
    borderColor: "#7a7877",
    backgroundColor: "green",
    padding: 10,
    color: "white",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  dislikeButton: {
    margin: 20,
    width: "30%",
    borderColor: "#7a7877",
    backgroundColor: "red",
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
