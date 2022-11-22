import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, ImageBackground, TextInput } from "react-native";
import { Text, View } from "../Themed";
import { patchUser } from "../../utils/userApi";
import { useCurrentUser, useRegisteredUser } from "../../context/Context";
import { CompletedSteps, CurrentStep } from "../../types";

type PreBattleProps = {
  completedSteps: CompletedSteps;
  currentStep: CurrentStep;
  questStepNo: number;
  setPreBattle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PreBattle({completedSteps, currentStep, questStepNo, setPreBattle}: PreBattleProps) {

    const navigation = useNavigation();

    const { setCurrentUser } = useCurrentUser();
    const { currentUser } = useRegisteredUser();

    const cancelQuest = () => {
        const updatedUser = {
          id: currentUser.id,
          current_quest_id: '0',
        };
        patchUser(updatedUser).then((user) => {  
          setCurrentUser(user);
        }).catch((err: any) => {     
          console.log("error in patch user", err);
        });
        navigation.navigate('TabTwo')
    }

   const goToMap = () => {
      setPreBattle(false)
    }


    return (
        <View style={styles.main}>
            <ImageBackground source={require('../../assets/images/stones.jpg')} style={styles.main} resizeMode="cover">           
            <View style={styles.holder}>
                <View style={styles.container}>
                {questStepNo === 0? <Text style={styles.text}>You Have arrived</Text> : null}
                {completedSteps.map(step =><Text key={step.desc} style={styles.green}>{step.desc}</Text>)}
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}>{currentStep.desc}</Text>
                </View>
                <View style={styles.container}>
                </View>
                <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={goToMap}>
					        <Text style={styles.text}>To Battle</Text>
				        </Pressable>
                <Pressable style={[styles.button, styles.cancel]} onPress={cancelQuest}>
                            <Text style={styles.buttonText}>Cancel Quest</Text>
                </Pressable>
                </View>
          </View>
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
  })