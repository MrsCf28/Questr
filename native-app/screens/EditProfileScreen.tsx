import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";

export default function EditProfileScreen() {
  const [image, setImage] = useState(null);
  

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    setImage(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submit = () => {
    setUser({ ...user, image: image });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={(text) => setUser({ ...user, name: text })}></TextInput>
      <TextInput
        placeholder="Region"
        style={styles.input}
        onChangeText={(text) => setUser({ ...user, region: text })}></TextInput>
      <Pressable
        style={styles.button}
        onPress={() => pickImage()}>
        <Text style={styles.text}>Pick Image</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={submit}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: "80%",
    padding: 10,
    borderRadius: 20,
  },
  button: {
    margin: 10,
    backgroundColor: "pink",
    width: "80%",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
  },
});
