import React from 'react';
import { StyleSheet } from 'react-native';

import { TouchableOpacity, ImageBackground } from 'react-native';
import {
    useNavigation,
} from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { patchUser } from '../utils/userApi';
import {
    useCurrentUser,
    useRegisteredUser,
} from '../context/Context';
import Votes from '../components/Votes';
export default function CompletedQuestScreen({ route }: any) {
    const { setCurrentUser } = useCurrentUser();
    const { currentUser } = useRegisteredUser();
    const navigation = useNavigation();

    let { currentQuest } = route.params;

    const quest = currentQuest;
    function updateUserStats() {
        let currentStats = { ...currentUser.stats };
        let updatedHistory = {
            quest_id: String(quest.id),
            quest_title: quest.title,
            completed_status: 'complete',
            start_time: String(Date.now()),
        };

        Object.keys(currentStats).forEach(stat => {
            currentStats[stat] += quest.rewards[stat];
        });

        const updatedUser = {
            id: currentUser.id,
            current_quest_id: '0',
            quest_history: [
                ...currentUser.quest_history,
                updatedHistory,
            ],
            stats: currentStats,
        };

        patchUser(updatedUser)
            .then((user) => {
                setCurrentUser(user);
                console.log('patched completed quest');
                navigation.navigate('TabOne', { screen: 'Home' });
            })
            .catch((err: any) => {
                console.log('error in patch user', err);
            });
    }

    // useEffect(() => {
    //   updateUserStats();
    // }, []);

    return (
        <View style={styles.main}>
            <ImageBackground
                source={require('../assets/images/stones.jpg')}
                style={styles.container}
                resizeMode="cover"
            >
                <ImageBackground
                    source={require('../assets/images/bigScroll.png')}
                    resizeMode="cover"
                    style={styles.scroll}
                >
                    <View style={styles.holder}>
                        <Text style={styles.title}>
                            Congratulations you completed{' '}
                            {quest.title}
                        </Text>
                        <View style={styles.container}>
                            <Text style={styles.title}>
                                The lord has bestowed upon thou many
                                gifts for your troubles.
                            </Text>
                        </View>
                        <View style={styles.container}>
                            <Text>
                                {quest.rewards.coins} coins{' '}
                                {quest.rewards.xp}XP
                            </Text>
                            <Text>
                                dexterity + {quest.rewards.dexterity}
                            </Text>
                            <Text>
                                exploration +{' '}
                                {quest.rewards.exploration}
                            </Text>
                            <Text>
                                perception +{' '}
                                {quest.rewards.exploration}
                            </Text>
                            <Text>
                                stamina + {quest.rewards.stamina}
                            </Text>
                            <Text>
                                strength + {quest.rewards.strength}
                            </Text>
                            <Text>
                                wisdom + {quest.rewards.wisdom}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.button]}
                            onPress={() => updateUserStats()}
                        >
                            <Text style={styles.buttonText}>
                                Claim Rewards
                            </Text>
                        </TouchableOpacity>
                        <Votes currentQuest={currentQuest}/>
                    </View>
                </ImageBackground>
            </ImageBackground>
        </View>
    );
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
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
        padding: 10,
        color: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
    },
    buttonText: {
        color: 'white',
    },
});
