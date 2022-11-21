import React, { useState, useContext } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { patchUser } from '../utils/userApi';
import {
    useCurrentUser,
    useRegisteredUser,
} from '../context/Context';

interface tabProp {
    selectedTab: string;
}

const Knight = require('../assets/images/knight.png');
const DeathKnight = require('../assets/images/deathknight.png');
const Jester = require('../assets/images/Jester.png');
const Bard = require('../assets/images/Bard.png');
const BlackSmith = require('../assets/images/blacksmith.png');
const King = require('../assets/images/king.png');
const Mage = require('../assets/images/mage.png');
const ManAtArms = require('../assets/images/manAtArms.png');
const Princess = require('../assets/images/Princess.png');
const Elf = require('../assets/images/elfknight.png');

export function AvatarSelector() {
    //This page could do with a refactor!! change alot of the buttons and conditional logic in to separate components

    const navigation = useNavigation();
    const { setCurrentUser } = useCurrentUser();
    const { currentUser } = useRegisteredUser();

    const [avatarArray, setAvatarArray] = useState([
        { id: 0, image: Bard, cost: 100 },
        { id: 1, image: Jester, cost: 200 },
        { id: 2, image: BlackSmith, cost: 300 },
        { id: 3, image: Knight, cost: 400 },
        { id: 4, image: ManAtArms, cost: 500 },
        { id: 5, image: Mage, cost: 600 },
        { id: 6, image: Elf, cost: 700 },
        { id: 7, image: Princess, cost: 800 },
        { id: 8, image: King, cost: 900 },
        { id: 9, image: DeathKnight, cost: 1000 },
    ]);
    const [currentAvatar, setCurrentAvatar] = useState(0);
    const [popup, setPopup] = useState(false);

    const { coins } = currentUser.stats;

    function avatarChecker() {
        if (
            currentUser.owned_avatar_ids.some(
                avatar => avatar === avatarArray[currentAvatar].id
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    function next() {
        if (currentAvatar === 9) {
            setCurrentAvatar(0);
        } else {
            setCurrentAvatar(current => current + 1);
        }
    }

    function previous() {
        if (currentAvatar === 0) {
            setCurrentAvatar(9);
        } else {
            setCurrentAvatar(current => current - 1);
        }
    }

    function select() {
        const updatedUser = {
            id: currentUser.id,
            avatar_uri: `${currentAvatar}`,
        };

        patchUser(updatedUser)
            .then((user) => {
                setCurrentUser(user);
                console.log('avatar updated');
            })
            .catch((err: any) => {
                console.log("error in patching user's avatar", err);
            });
        navigation.goBack();
    }

    function buy() {
        const newBoughtAvatars = [
            ...currentUser.owned_avatar_ids,
            avatarArray[currentAvatar].id,
        ];
        const newStats = {
            ...currentUser.stats,
            coins:
                currentUser.stats.coins -
                avatarArray[currentAvatar].cost,
        };

        const updatedUser = {
            id: currentUser.id,
            stats: newStats,
            owned_avatar_ids: newBoughtAvatars,
        };

        patchUser(updatedUser)
            .then((user) => {
                setCurrentUser(user);
                console.log('patched newStats & owned_avatar_ids');
            })
            .catch((err: any) => {
                console.log('error in patch user', err);
            });
        navigation.goBack();
    }

    function sell() {
        if (
            currentUser.owned_avatar_ids.length > 1 &&
            Number(currentUser.avatar_uri) !== currentAvatar
        ) {
            const newBoughtAvatars =
                currentUser.owned_avatar_ids.filter(
                    avatar => avatar !== currentAvatar
                );
            const newStats = {
                ...currentUser.stats,
                coins: currentUser.stats.coins + 50,
            };

            const updatedUser = {
                id: currentUser.id,
                stats: newStats,
                owned_avatar_ids: newBoughtAvatars,
            };

            patchUser(updatedUser)
                .then((user) => {
                    setCurrentUser(user);
                    console.log(
                        'patched newStats and removed sold avatar'
                    );
                })
                .catch((err: any) => {
                    console.log('error in patch user', err);
                });
        } else {
            setPopup(true);
            setTimeout(() => {
                setPopup(false);
            }, 1000);
        }
    }

    return (
        <View style={[styles.container]}>
            <ImageBackground
                source={require('../assets/images/wood.jpg')}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={[styles.holder]}>
                    <View style={styles.frame}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={avatarArray[currentAvatar].image}
                        />
                    </View>

                    <View
                        style={{ flexDirection: 'row', width: '90%' }}
                    >
                        <View style={styles.plaque}>
                            {!avatarChecker() ? (
                                <Text style={styles.text}>
                                    {avatarArray[currentAvatar].cost}{' '}
                                    Gold
                                </Text>
                            ) : (
                                <Text style={styles.text}>
                                    {Number(
                                        currentUser.avatar_uri
                                    ) !== currentAvatar
                                        ? 'Owned'
                                        : 'Selected'}
                                </Text>
                            )}
                        </View>
                        {!avatarChecker() ? (
                            <Pressable
                                style={[
                                    styles.button,
                                    coins <
                                    avatarArray[currentAvatar].cost
                                        ? styles.disabledButton
                                        : null,
                                ]}
                                onPress={buy}
                            >
                                <Text style={styles.text}>
                                    {coins <
                                    avatarArray[currentAvatar].cost
                                        ? 'Insufficent Funds'
                                        : 'Buy'}
                                </Text>
                            </Pressable>
                        ) : (
                            <Pressable
                                style={[
                                    styles.button,
                                    avatarChecker()
                                        ? styles.disabledButton
                                        : null,
                                ]}
                                onPress={sell}
                            >
                                <Text style={styles.text}>
                                    Sell: 50 Gold
                                </Text>
                            </Pressable>
                        )}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '90%' }}>
                    <View style={styles.plaque}>
                        {!avatarChecker() ? (
                            <Text style={styles.text}>
                                {avatarArray[currentAvatar].cost} Gold
                            </Text>
                        ) : (
                            <Text style={styles.text}>
                                {Number(currentUser.avatar_uri) !==
                                currentAvatar
                                    ? 'Owned'
                                    : 'Selected'}
                            </Text>
                        )}
                    </View>
                    {!avatarChecker() ? (
                        <Pressable
                            disabled={
                                coins <
                                avatarArray[currentAvatar].cost
                            }
                            style={[
                                styles.button,
                                coins <
                                avatarArray[currentAvatar].cost
                                    ? styles.disabledButton
                                    : null,
                            ]}
                            onPress={buy}
                        >
                            <Text style={styles.text}>
                                {coins <
                                avatarArray[currentAvatar].cost
                                    ? 'Insufficent Funds'
                                    : 'Buy'}
                            </Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={[
                                styles.button,
                                avatarChecker()
                                    ? styles.disabledButton
                                    : null,
                            ]}
                            onPress={sell}
                        >
                            <Text style={styles.text}>
                                Sell: 50 Gold
                            </Text>
                        </Pressable>
                    )}
                </View>

                <View
                    style={[
                        styles.holder,
                        { flex: 1, flexDirection: 'row' },
                    ]}
                >
                    <Pressable
                        style={styles.button}
                        onPress={previous}
                    >
                        <Text style={styles.text}>Previous</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={next}>
                        <Text style={styles.text}>Next</Text>
                    </Pressable>
                </View>
                <View style={styles.selectButton}>
                    {avatarChecker() &&
                    Number(currentUser.avatar_uri) !==
                        currentAvatar ? (
                        <Pressable
                            disabled={!avatarChecker()}
                            style={[
                                styles.button,
                                { width: '50%' },
                                avatarChecker()
                                    ? null
                                    : styles.disabledButton,
                            ]}
                            onPress={select}
                        >
                            <Text style={styles.text}>Select</Text>
                        </Pressable>
                    ) : null}
                </View>
                {popup ? (
                    <View style={styles.overlay}>
                        <Text style={styles.text}>
                            {Number(currentUser.avatar_uri) !==
                            currentAvatar
                                ? 'Must Have At Least One Avatar'
                                : "Can't Sell Current Avatar"}
                        </Text>
                    </View>
                ) : null}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#d4d4d4',
        backgroundColor: '#292936',
        borderRadius: 20,
        marginRight: 10,
    },
    holder: {
        flex: 8,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    text: {
        fontWeight: 'bold',
        lineHeight: 30,
        color: '#d4d4d4',
    },
    button: {
        margin: 5,
        padding: 5,
        color: 'white',
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
    },
    selectButton: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plaque: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#d4d4d4',
        backgroundColor: '#292936',
        borderRadius: 20,
        width: '50%',
    },
    disabledButton: {
        backgroundColor: '#4a040c',
    },

    overlay: {
        position: 'absolute',
        bottom: '30%',
        margin: 10,
        padding: 10,
        color: 'white',
        borderRadius: 20,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 5,
        borderColor: '#7a7877',
        backgroundColor: '#4a040c',
    },
});
