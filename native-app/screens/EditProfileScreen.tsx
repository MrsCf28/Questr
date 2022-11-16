import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, TextInput, Image } from "react-native";
import { Text, View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";
import { CurrentUser } from "../context/CurrentUser";
import { addUser, patchUser } from "../utils/userApi";

export default function EditProfileScreen({ signedUp, setSignedUp }) {
  console.log(signedUp, "props");

  const [image, setImage] = useState(null);
  const { currentUser, setCurrentUser } = useContext(CurrentUser);
  // const [imageUri, setImageUri] = useState("notSet");
  // const [image64, setImage64] = useState(null);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const submit = () => {
    setCurrentUser({ ...currentUser, image: image });
    if (signedUp) {
      console.log("in if");
      patchUser(currentUser).catch(() => {
        console.log("error in patch user");
      });
      console.log(currentUser);
    } else {
      console.log("in else");
      addUser(currentUser);
      console.log(currentUser);
      setSignedUp(true);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
      ) : (
        <Image
          style={styles.image}
          source={{ uri: "https://picsum.photos/200/300" }}
        />
      )}
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={(text) =>
          setCurrentUser({ ...currentUser, display_name: text })
        }></TextInput>
      <TextInput
        placeholder="Age"
        style={styles.input}
        onChangeText={(text) =>
          setCurrentUser({ ...currentUser, age: text })
        }></TextInput>
      <TextInput
        placeholder="Region"
        style={styles.input}
        onChangeText={(text) =>
          setCurrentUser({ ...currentUser, preferred_region: [text] })
        }></TextInput>
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
