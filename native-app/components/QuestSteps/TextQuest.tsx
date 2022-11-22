import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, ImageBackground, TextInput } from "react-native";
import { Text, View } from "../../components/Themed";
import { useCurrentUser, useRegisteredUser } from "../../context/Context";
import { patchUser } from "../../utils/userApi";



export default function TextQuest({completedSteps, currentStep, questStepNo, setQuestStepNo}) {

    const navigation = useNavigation();

    const { setCurrentUser } = useCurrentUser();
    const { currentUser } = useRegisteredUser();
    const [answer, setAnswer] = useState('')
    const [popup, setPopup] = useState(false)
    const [correct, setCorrect] = useState(false)

    // useEffect(() => {
    //     console.log('yeah')
    // }, [questStepNo])
    // console.log(answer)

    const cancelQuest = () => {
        const updatedUser = {
          id: currentUser.id,
          current_quest_id: '0',
        };
        patchUser(updatedUser).then((user) => {  
          setCurrentUser(user)
        }).catch((err: any) => {     
          console.log("error in patch user", err);
        });
        navigation.navigate('TabTwo')
    }

    const handleSubmit = () => {
        if(currentStep.endpoint.includes(answer.toLowerCase())) {
            setAnswer('')
            setPopup(true)
            setCorrect(true)
            setTimeout(() => {
              setPopup(false)
              setQuestStepNo((current) => current + 1)
              setCorrect(false)
            }, 1000)
        } else {
          setAnswer('')
          setPopup(true)
          setCorrect(false)
          setTimeout(() => {
            setPopup(false)
          }, 1000)
        }
    }


    return (
        <View style={styles.main}>
            <ImageBackground source={require('../../assets/images/stones.jpg')} style={styles.main} resizeMode="cover">
            {popup? 
                correct?             
                <View style={[styles.holder, styles.correct]}>
                  <Text style={styles.text}>Correct Answer!</Text>
                </View>: 
                <View style={[styles.holder, styles.correct, styles.incorrect]}>
                  <Text style={styles.text}>Incorrect Answer!</Text>
                </View>
              :
            <View style={styles.holder}>
                <View style={styles.container}>
                {questStepNo === 0? <Text style={styles.text}>You Have arrived</Text> : null}
                {completedSteps.map(step =><Text key={step.desc} style={styles.green}>{step.desc}</Text>)}
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>{currentStep.desc}</Text>
                </View>
                <View style={styles.container}>
                    <TextInput placeholder="Answer"
                        placeholderTextColor={'#d4d4d4'}
                        style={styles.input}
                        value={answer}
                        onChangeText={(text) => {
                            setAnswer(text)}}>
                    </TextInput>
                </View>
                <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleSubmit}>
					<Text style={styles.text}>Submit</Text>
				</Pressable>
                <Pressable style={[styles.button, styles.cancel]} onPress={cancelQuest}>
                            <Text style={styles.buttonText}>Cancel Quest</Text>
                </Pressable>
                </View>
          </View>}
          </ImageBackground>
        </View>
        )
    }


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      width: "100%",
      justifyContent: 'center',
      backgroundColor: 'none',
      margin: 20,
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 3,
        borderColor: '#d4d4d4',
        backgroundColor: '#292936',
        borderRadius: 20,
        margin: 40,
        padding: 20,
        Width: '100%'
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: 'center'
    },
    buttonContainer: {
      alignItems: "center",
      width: "100%",
      backgroundColor: 'none'
    },
    button: {
      margin: 20,
      width: 250,
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
      color: 'red',
      textAlign: 'center'
    },
    blueText: {
      color: 'blue',
      textAlign: 'center'
    },
    text: {
      textTransform: "capitalize",
      color: 'white',
      textAlign: 'center'
    },
    green: {
      textTransform: "capitalize",
      color: '#01803a',
      textAlign: 'center'
    },
    input: {
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#d4d4d4",
		backgroundColor: "#292936",
		borderRadius: 15,
		width: 250,
		height: 50,
		borderWidth: 1,
		padding: 10,
		color: 'white'
	},
    correct: {
        backgroundColor: '#0a4a20',
        height: 200,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    incorrect: {
      backgroundColor: '#4a040c',
    }
  })