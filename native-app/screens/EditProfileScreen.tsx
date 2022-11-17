
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, Image } from "react-native";
import { Text, View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";
import { CurrentUser } from "../context/CurrentUser";
import { addUser, patchUser } from '../utils/userApi';
import { SignedUp } from '../context/SignedUp';

import { useNavigation } from "@react-navigation/native";

type User = {
    id: string;
    display_name: string;
    age: number;
    preferred_region: Array<string>;
    image: string;
    current_quest_id: string;
    quest_history: Array<object>;
    avatar_uri: string;
};

export default function EditProfileScreen() {
  
  const {currentUser, setCurrentUser} = useContext(CurrentUser)
  const {image} = currentUser
  const [newImage, setNewImage] = useState(image);
//   const navigation = useNavigation();

    // const [image, setImage] = useState(
    //     'https://picsum.photos/200/300'
    // );
    const [imagePicked, setImagePicked] = useState(1)
    const { signedUp, setSignedUp } = useContext(SignedUp);

    let displayImage = <Image style={styles.image} source={{ uri: currentUser.image }} />;

    useEffect(() => {
        displayImage = <Image style={styles.image} source={{ uri: currentUser.image }} />
    }, [imagePicked])


    async function pickImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {

            setImagePicked(prev => prev++);
            setCurrentUser({ ...currentUser, image: result.assets[0].uri })
        }
    }
  
    function handleSubmit() {
        if (signedUp) {
            const updatedUser: User = {
                id: currentUser.id,
                display_name: currentUser.display_name,
                age: currentUser.age,
                preferred_region: currentUser.preferred_region,
                image: currentUser.image,
                current_quest_id: currentUser.current_quest_id,
                quest_history: currentUser.quest_id,
                avatar_uri: currentUser.avatar_uri,
            };
            patchUser(updatedUser).catch((err: any) => {
                console.log('error in patch user', err);
            });
            // navigation.goBack()
        } else {
            currentUser.avatar_uri = "../assets/images/knight.png"
            currentUser.current_quest_id = "0";
            currentUser.quest_history = [];
            addUser(currentUser);
            setSignedUp(true);
        }
    }
    // we need to handle the async aspect.
    // I can get the image to stay after sign in and out and reload,
    // but only if I go back and forth between the pages
    







    return (
        <View style={styles.container}>
            {displayImage}
            <TextInput
                placeholder="Name"
                style={styles.input}
                onChangeText={text =>
                    setCurrentUser({
                        ...currentUser,
                        display_name: text,
                    })
                }
            ></TextInput>
            <TextInput
                placeholder="Age"
                style={styles.input}
                onChangeText={text =>
                    setCurrentUser({ ...currentUser, age: text })
                }
            ></TextInput>
            <TextInput
                placeholder="Region"
                style={styles.input}
                onChangeText={text =>
                    setCurrentUser({
                        ...currentUser,
                        preferred_region: [text],
                    })
                }
            ></TextInput>
            <Pressable
                style={styles.button}
                onPress={() => pickImage()}
            >
                <Text style={styles.text}>Pick Image</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={handleSubmit}>
                <Text style={styles.text}>Submit</Text>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        width: '80%',
        padding: 10,
        borderRadius: 20,
    },
    button: {
        margin: 10,
        backgroundColor: 'pink',
        width: '80%',
        padding: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 100,
        margin: 10,
    },
});
