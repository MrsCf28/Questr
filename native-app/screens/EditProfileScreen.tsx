import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, TextInput, Image } from "react-native";
import { Text, View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";
import { CurrentUser } from "../context/CurrentUser";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  
  const {currentUser, setCurrentUser} = useContext(CurrentUser)
  const {image} = currentUser
  const [newImage, setNewImage] = useState(image);
  const navigation = useNavigation();

  console.log(image)

  async function pickImage() {
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1,1],
          quality: 1,
          base64: true
        });
    
        if (!result.canceled) {
          setNewImage(result.assets[0].uri);
        }
  }
  
  const submit = () => {
    setCurrentUser({...currentUser, image:newImage});
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: newImage}}/>
      <TextInput
        placeholder="Name"
        style={styles.input}
        ></TextInput>
      <TextInput
        placeholder="Region"
        style={styles.input}
        ></TextInput>
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
  image: {
    height: 150,
    width: 150,
    borderRadius: 100,
    margin: 10,
}
});
