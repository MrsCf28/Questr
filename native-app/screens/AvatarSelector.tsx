import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { patchUser } from '../utils/userApi';
import {
    useCurrentUser,
    useRegisteredUser,
} from '../context/Context';

import { avatarInfo } from '../utils/avatarInfo';

export function AvatarSelector() {
    const navigation = useNavigation();
    const { setCurrentUser } = useCurrentUser();
    const { currentUser } = useRegisteredUser();

    const [currentAvatar, setCurrentAvatar] = useState(0);
    const [popup, setPopup] = useState(false);

    const { coins } = currentUser.stats;

    function avatarChecker() {
        return currentUser.owned_avatar_ids.some(
            avatar => avatar === avatarInfo[currentAvatar].id
        );
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
            .then(user => {
                setCurrentUser(user);
            })
            .catch((err: any) => {
                console.log("error in patching user's avatar", err);
            });
        navigation.goBack();
    }

    function buy() {
        const newBoughtAvatars = [
            ...currentUser.owned_avatar_ids,
            avatarInfo[currentAvatar].id,
        ];
        const newStats = {
            ...currentUser.stats,
            coins:
                currentUser.stats.coins -
                avatarInfo[currentAvatar].cost,
        };

        const updatedUser = {
            id: currentUser.id,
            stats: newStats,
            owned_avatar_ids: newBoughtAvatars,
        };

        patchUser(updatedUser)
            .then(user => {
                setCurrentUser(user);
            })
            .catch((err: any) => {
                console.log('error in patch user', err);
            });
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
                .then(user => {
                    setCurrentUser(user);
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
                            source={{
                                uri: avatarInfo[currentAvatar].image,
                            }}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', width: '90%' }}>
                    <View style={styles.plaque}>
                        {!avatarChecker() ? (
                            <Text style={styles.text}>
                                {avatarInfo[currentAvatar].cost} Gold
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
                        <TouchableOpacity
                            disabled={
                                coins < avatarInfo[currentAvatar].cost
                            }
                            style={[
                                styles.button,
                                coins < avatarInfo[currentAvatar].cost
                                    ? styles.disabledButton
                                    : null,
                            ]}
                            onPress={buy}
                        >
                            <Text style={styles.text}>
                                {coins <
                                avatarInfo[currentAvatar].cost
                                    ? 'Insufficent Funds'
                                    : 'Buy'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
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
                        </TouchableOpacity>
                    )}
                </View>

                <View
                    style={[
                        styles.holder,
                        { flex: 1, flexDirection: 'row' },
                    ]}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={previous}
                    >
                        <Text style={styles.text}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={next}
                    >
                        <Text style={styles.text}>Next</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.selectButton}>
                    {avatarChecker() &&
                    Number(currentUser.avatar_uri) !==
                        currentAvatar ? (
                        <TouchableOpacity
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
                        </TouchableOpacity>
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
