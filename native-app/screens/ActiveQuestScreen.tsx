import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import LocationQuest from '../components/QuestSteps/LocationQuest';
import PreLocation from '../components/QuestSteps/PreLocation';
import PreBattle from '../components/QuestSteps/PreBattle';
import PreCamera from '../components/QuestSteps/PreCamera';
import TextQuest from '../components/QuestSteps/TextQuest';
import BattleQuest from '../components/QuestSteps/BattleQuest';
import CameraScreen from './CameraScreen';
import { useRegisteredUser } from '../context/Context';

export default function ActiveQuestScreen({ route }: any) {
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

    useEffect(() => {
        if (questStepNo === currentQuest.objectives.length) {
            navigation.navigate('CompletedQuestScreen', {
                currentUser,
                currentQuest,
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
