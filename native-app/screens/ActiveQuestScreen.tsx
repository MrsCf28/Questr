import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, ImageBackground } from 'react-native';
import LocationQuest from '../components/QuestSteps/LocationQuest';
import PreLocation from '../components/QuestSteps/PreLocation';
import PreBattle from '../components/QuestSteps/PreBattle';
import PreCamera from '../components/QuestSteps/PreCamera';
import TextQuest from '../components/QuestSteps/TextQuest';
import BattleQuest from '../components/QuestSteps/BattleQuest';
import { Text, View } from '../components/Themed';
import CameraScreen from './CameraScreen';
import {
    useCurrentUser,
    useRegisteredUser,
} from '../context/Context';

export default function ActiveQuestScreen({ route }: any) {
    const { setCurrentUser } = useCurrentUser();
    const { currentUser } = useRegisteredUser();
    const currentQuest = route.params;
    const navigation = useNavigation();
    const [questStepNo, setQuestStepNo] = useState(0);
    const [currentStep, setCurrentStep] = useState(
        currentQuest.objectives[questStepNo]
    );
    const [preLocation, setPreLocation] = useState(true);
    const [preBattle, setPreBattle] = useState(true);
    const [preCamera, setPreCamera] = useState(true);
    const [completedSteps, setCompletedSteps] = useState([]);

    const cancelQuest = () => {
        setCurrentUser({ ...currentUser, current_quest_id: '0' });

        const updatedUser = {
            id: currentUser.id,
            age: currentUser.age,
            current_quest_id: '0',
        };
    };

    useEffect(() => {
        if (questStepNo === currentQuest.objectives.length) {
            navigation.navigate('CompletedQuestScreen', {
                currentQuest,
                currentUser,
            });
        } else {
            setCurrentStep(currentQuest.objectives[questStepNo]);
            setCompletedSteps(
                currentQuest.objectives.slice(0, questStepNo)
            );
            setPreBattle(true);
            setPreLocation(true);
        }
    }, [questStepNo]);

    if (currentStep.method === 'text') {
        return (
            <TextQuest
                completedSteps={completedSteps}
                setQuestStepNo={setQuestStepNo}
                questStepNo={questStepNo}
                currentStep={currentStep}
            />
        );
    } else if (currentStep.method === 'location') {
        return preLocation ? (
            <PreLocation
                completedSteps={completedSteps}
                setPreLocation={setPreLocation}
                questStepNo={questStepNo}
                currentStep={currentStep}
            />
        ) : (
            <LocationQuest
                setQuestStepNo={setQuestStepNo}
                questStepNo={questStepNo}
                currentStep={currentStep}
            />
        );
    } else if (currentStep.method === 'battle') {
        return preBattle ? (
            <PreBattle
                completedSteps={completedSteps}
                setPreBattle={setPreBattle}
                questStepNo={questStepNo}
                currentStep={currentStep}
            />
        ) : (
            <BattleQuest
                setQuestStepNo={setQuestStepNo}
                setPreBattle={setPreBattle}
                currentStep={currentStep}
            />
        );
    } else if (currentStep.method === 'image') {
        return preCamera ? (
            <PreCamera
                completedSteps={completedSteps}
                setPreCamera={setPreCamera}
                questStepNo={questStepNo}
                currentStep={currentStep}
            />
        ) : (
            <CameraScreen setQuestStepNo={setQuestStepNo} />
        );
    }
    // <View style={styles.main}>
    //     <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
    //     <ImageBackground source={require('../assets/images/bigScroll.png')} resizeMode="cover" style={styles.scroll}>
    //     <View style={styles.holder}>
    //     <View style={styles.container}>
    //       {questStepNo === 0? <Text>You Have arrived</Text> : null}
    //       {completedSteps.map(step =><Text key={step.desc} style={styles.green}>{step.desc}</Text>)}
    //     </View>
    //     <View style={styles.container}>
    //         <Text>{currentStep.desc}</Text>
    //     </View>
    //     <View style={styles.buttonContainer}>
    //       <Pressable
    //             style={styles.button}
    //             onPress={() => {
    //               navigation.navigate("CameraScreen");
    //             }}
    //           >
    //             <Text style={styles.buttonText}>Open Camera</Text>
    //       </Pressable>
    //       <Pressable style={[styles.button, styles.cancel]} onPress={cancelQuest}>
    //                   <Text style={styles.buttonText}>Cancel Quest</Text>
    //       </Pressable>
    //     </View>
    //   </View>
    //   </ImageBackground>
    //   </ImageBackground>
    // </View>
    // )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'none',
    },
    main: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroll: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    holder: {
        flex: 1,
        paddingHorizontal: 40,
        paddingVertical: 120,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'none',
    },
    buttonContainer: {
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'none',
    },
    button: {
        margin: 20,
        width: '80%',
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
        borderWidth: 3,
        padding: 10,
        color: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancel: {
        backgroundColor: '#4a040c',
    },
    buttonText: {
        color: 'white',
    },
});
