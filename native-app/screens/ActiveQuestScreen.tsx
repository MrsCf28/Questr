import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, ImageBackground } from "react-native";
import TextQuest from "../components/QuestSteps/TextQuest";
import { Text, View } from "../components/Themed";
import { CurrentUser } from "../context/CurrentUser";



export default function ActiveQuestScreen({route}) {
    const currentQuest = route.params
    const navigation = useNavigation();
    const [questStep, setQuestStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(currentQuest.objectives[questStep])

    const { currentUser, setCurrentUser } = useContext(CurrentUser)

    const cancelQuest = () => {
        setCurrentUser({ ...currentUser, current_quest_id: '0' });
        
        const updatedUser = {
          id: currentUser.id,
          age: currentUser.age,
          current_quest_id: '0',
        };
    }

    useEffect(() => {
        if(questStep === currentQuest.objectives.length) {
            navigation.navigate("CompletedQuestScreen", {
                currentQuest,
                currentUser,
              })
        } else {
            setCurrentStep(currentQuest.objectives[questStep])
        }
        
    }, [questStep])

    if(currentStep.method === 'text') {
        return <TextQuest setQuestStep={setQuestStep} questStep={questStep} currentStep={currentStep}/>
    } else if(currentStep.method === 'location') {

    } else if(currentStep.method === 'battle') {

    } else if(currentStep.method === 'image') {
    return (
        <View style={styles.main}>
            <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
            <ImageBackground source={require('../assets/images/bigScroll.png')} resizeMode="cover" style={styles.scroll}>
            <View style={styles.holder}>
            <View style={styles.container}>
              {questStep === 0? <Text>You Have arrived</Text> : null}
              <Text>Now complete the task at hand</Text>
            </View>
            <View style={styles.container}>
                <Text>{currentStep.desc}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate("CameraScreen");
                    }}
                  >
                    <Text style={styles.buttonText}>Submit Quest Update</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.cancel]} onPress={cancelQuest}>
                          <Text style={styles.buttonText}>Cancel Quest</Text>
              </Pressable>
            </View>
          </View>
          </ImageBackground>
          </ImageBackground>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      width: "100%",
      justifyContent: 'center',
      backgroundColor: 'none'
    },
    main: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    scroll: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    holder: {
      flex: 1,
      paddingHorizontal: 40,
      paddingVertical: 120,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'none'
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    buttonContainer: {
      alignItems: "center",
      width: "100%",
      backgroundColor: 'none'
    },
    button: {
      margin: 20,
      width: "80%",
      borderColor: '#7a7877',
      backgroundColor: '#014c54',
      borderWidth: 3,
      padding: 10,
      color: "white",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    cancel: {
      backgroundColor: "#4a040c",
    },
    buttonText: {
      color: "white",
    },
    redText: {
      color: 'red'
    },
    blueText: {
      color: 'blue',
    },
    text: {
      textTransform: "capitalize",
    },
  })