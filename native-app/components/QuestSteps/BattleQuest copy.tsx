import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Text, View } from '../Themed';
import {
    defenceLogic,
    generateEnemy,
    magicAttackLogic,
    quickAttackLogic,
} from './BattleLogic';
import { useRegisteredUser } from '../../context/Context';
import { CurrentStep } from '../../types';
import { avatarInfo } from '../../utils/avatarInfo';

type BattleQuestProps = {
    setQuestStepNo: React.Dispatch<React.SetStateAction<number>>;
    setPreBattle: React.Dispatch<React.SetStateAction<boolean>>;
    currentStep: CurrentStep;
};

// do we need currentStep if it is not used here?

export default function BattleQuest({
    setQuestStepNo,
    setPreBattle,
    currentStep,
}: BattleQuestProps) {
    const { currentUser } = useRegisteredUser();
    const avatar = Number(currentUser.avatar_uri);

    const [myAvatar, setMyAvatar] = useState(
        avatarInfo[avatar].image
    );

    const {
        dexterity,
        exploration,
        perception,
        stamina,
        strength,
        wisdom,
        xp,
    } = currentUser.stats;

    const [enemyDamage, setEnemyDamage] = useState(false);
    const [myDamage, setMyDamage] = useState(false);
    const [attack, setAttack] = useState(false);
    const [win, setWin] = useState('null');

    const [enemy, setEnemy] = useState(
        generateEnemy(currentUser.current_quest_id)
    );
    let health = 0;
    if (enemy?.health !== undefined) {
        health = enemy.health;
    }
    const [enemyHealth, setEnemyHealth] = useState(health);
    const [myHealth, setMyHealth] = useState(
        Math.round((xp + 100) / 2)
    );
    let initialAttackInfo = {
        myMove: '',
        enemyAttack: '',
        myDamageAmount: 0,
        myDamage: false,
        enemyDamageAmount: 0,
        enemyDamage: false,
        statement: '',
    };

    const [attackInfo, setAttackInfo] = useState(initialAttackInfo);
    const [help, sethelp] = useState(false);

    useEffect(() => {
        setMyAvatar(avatarInfo[avatar].image);
    }, [currentUser.avatar_uri]);

    useEffect(() => {
        if (myHealth <= 0) {
            setWin('false');
        } else if (enemyHealth <= 0) {
            setWin('true');
        }
    }, [enemyHealth, myHealth]);

    const magicAttack = () => {
        const attack = magicAttackLogic(currentUser.stats, enemy);
        setAttack(true);
        setEnemyDamage(attack.enemyDamage);
        setMyDamage(attack.myDamage);
        setAttackInfo(attack);
        setMyHealth(current => current - attack.myDamageAmount);
        setEnemyHealth(current => current - attack.enemyDamageAmount);
        setTimeout(() => {
            setAttack(false);
            setMyDamage(false);
            setEnemyDamage(false);
        }, 2000);
    };

    const quickAttack = () => {
        const attack = quickAttackLogic(currentUser.stats, enemy);
        setAttack(true);
        setEnemyDamage(attack.enemyDamage);
        setMyDamage(attack.myDamage);
        setAttackInfo(attack);
        setMyHealth(current => current - attack.myDamageAmount);
        setEnemyHealth(current => current - attack.enemyDamageAmount);
        setTimeout(() => {
            setAttack(false);
            setMyDamage(false);
            setEnemyDamage(false);
        }, 2000);
    };

    const defence = () => {
        const attack = defenceLogic(currentUser.stats, enemy);
        setAttack(true);
        setEnemyDamage(attack.enemyDamage);
        setMyDamage(attack.myDamage);
        setAttackInfo(attack);
        setMyHealth(current => current - attack.myDamageAmount);
        setEnemyHealth(current => current - attack.enemyDamageAmount);
        setTimeout(() => {
            setAttack(false);
            setMyDamage(false);
            setEnemyDamage(false);
        }, 2000);
    };

    if (win === 'true') {
        return (
            <View style={styles.main}>
                <ImageBackground
                    source={require('../../assets/images/battlebg.png')}
                    style={styles.main}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <Image
                            resizeMode="contain"
                            source={{uri: myAvatar}}
                            style={styles.myAvatar}
                        ></Image>
                        <View style={styles.container}>
                            <Text style={styles.boldGreen}>
                                YOU WIN
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>
                                    setQuestStepNo(
                                        current => current + 1
                                    )
                                }
                            >
                                <Text style={styles.text}>
                                    Continue
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    } else if (win === 'false') {
        return (
            <View style={styles.main}>
                <ImageBackground
                    source={require('../../assets/images/battlebg.png')}
                    style={styles.main}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <Image
                            resizeMode="contain"
                            source={enemy.image}
                            style={styles.enemyAvatar}
                        ></Image>
                        <View style={styles.container}>
                            <Text style={styles.boldRed}>
                                YOU LOSE
                            </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setPreBattle(true)}
                            >
                                <Text style={styles.text}>
                                    Try Again
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    } else {
        return (
            <View style={styles.main}>
                <ImageBackground
                    source={require('../../assets/images/battlebg.png')}
                    style={styles.main}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <Image
                            resizeMode="contain"
                            source={{uri: myAvatar}}
                            style={styles.myAvatar}
                        ></Image>
                        <Image
                            resizeMode="contain"
                            source={enemy.image}
                            style={styles.enemyAvatar}
                        ></Image>
                        <View style={styles.box}>
                            <View style={styles.box}>
                                {attackInfo.statement !== '' ? (
                                    <Text style={styles.header}>
                                        {attackInfo.statement}
                                    </Text>
                                ) : (
                                    <Text></Text>
                                )}
                            </View>
                            <View style={styles.boxRow}>
                                {attack ? (
                                    <View style={styles.bubble}>
                                        <Text style={styles.text}>
                                            {attackInfo.myMove}
                                        </Text>
                                    </View>
                                ) : null}
                                {attack ? (
                                    <View style={styles.bubble}>
                                        <Text style={styles.text}>
                                            {attackInfo.enemyAttack}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>

                            <View style={styles.boxRow}>
                                {myDamage || enemyDamage ? (
                                    <View style={styles.bubble}>
                                        <Text style={[styles.damage]}>
                                            -
                                            {
                                                attackInfo.myDamageAmount
                                            }
                                        </Text>
                                    </View>
                                ) : null}
                                {enemyDamage || myDamage ? (
                                    <View style={styles.bubble}>
                                        <Text style={[styles.damage]}>
                                            -{' '}
                                            {
                                                attackInfo.enemyDamageAmount
                                            }
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                        {!attack ? (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => magicAttack()}
                                >
                                    <Text style={styles.text}>
                                        Magic Attack
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => quickAttack()}
                                >
                                    <Text style={styles.text}>
                                        Quick Attack
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => defence()}
                                >
                                    <Text style={styles.text}>
                                        Defence
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => sethelp(true)}
                                >
                                    <Text style={styles.text}>
                                        Help
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View
                                style={styles.buttonContainer}
                            ></View>
                        )}
                        {help ? (
                            <View style={styles.overlay}>
                                <Text style={styles.text}>
                                    Pick What Attack To Use And Hope
                                    It Beats The Enemies
                                </Text>
                                <Text></Text>
                                <Text style={styles.text}>
                                    MAGIC ATTACKS break a DEFENCE.
                                </Text>
                                <Text style={styles.text}>
                                    QUICK ATTACKS interrupt MAGIC.
                                </Text>
                                <Text style={styles.text}>
                                    DEFENCE smashes a QUICK ATTACK.
                                </Text>
                                <Text></Text>
                                <Text style={styles.text}>
                                    The Damage Caused By The Winner Of
                                    Each Attack Is Based The Stats Of
                                    The Character
                                </Text>
                                <Text></Text>
                                <Text style={styles.text}>
                                    Magic Power = Wisdom + Exploration
                                </Text>
                                <Text style={styles.text}>
                                    Attack Power = Strength +
                                    Dexterity
                                </Text>
                                <Text style={styles.text}>
                                    Defence Power = Stamina +
                                    Perception
                                </Text>
                                <Text></Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => sethelp(false)}
                                >
                                    <Text style={styles.text}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        <View style={styles.containerRow}>
                            <View style={styles.holder}>
                                <Text
                                    style={[styles.text, styles.bold]}
                                >
                                    Health: {myHealth}
                                </Text>
                                <Text style={styles.text}>
                                    Stamina: {stamina}
                                </Text>
                                <Text style={styles.text}>
                                    Exploration: {exploration}
                                </Text>
                                <Text style={styles.text}>
                                    Perception: {perception}
                                </Text>
                                <Text style={styles.text}>
                                    Dexterity: {dexterity}
                                </Text>
                                <Text style={styles.text}>
                                    Wisdom: {wisdom}
                                </Text>
                                <Text style={styles.text}>
                                    Strength: {strength}
                                </Text>
                            </View>
                            <View style={styles.holder}>
                                <Text
                                    style={[styles.text, styles.bold]}
                                >
                                    Health: {enemyHealth}
                                </Text>
                                <Text style={styles.text}>
                                    Stamina: {enemy.stamina}
                                </Text>
                                <Text style={styles.text}>
                                    Exploration: {enemy.exploration}
                                </Text>
                                <Text style={styles.text}>
                                    Perception: {enemy.perception}
                                </Text>
                                <Text style={styles.text}>
                                    Dexterity: {enemy.dexterity}
                                </Text>
                                <Text style={styles.text}>
                                    Wisdom: {enemy.wisdom}
                                </Text>
                                <Text style={styles.text}>
                                    Strength: {enemy.strength}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: 'none',
    },

    containerRow: {
        flex: 2,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'none',
    },
    box: {
        flex: 4,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'flex-start',
        backgroundColor: 'none',
        padding: 20,
    },
    boxRow: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'none',
        padding: 20,
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    myAvatar: {
        position: 'absolute',
        left: '-40%',
        width: '100%',
    },
    enemyAvatar: {
        position: 'absolute',
        right: '-40%',
        width: '100%',
    },
    holder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 3,
        borderColor: '#d4d4d4',
        backgroundColor: '#292936',
        borderRadius: 20,
        bottom: 0,
    },
    bold: {
        fontWeight: 'bold',
        color: '#01803a',
    },
    text: {
        color: '#d4d4d4',
        textAlign: 'center',
    },
    button: {
        margin: 15,
        width: 150,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
        borderWidth: 3,
        padding: 10,
        color: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        backgroundColor: 'none',
        flex: 3,
        justifyContent: 'flex-end',
    },
    damage: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
    bubble: {
        backgroundColor: '#4a040c',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderWidth: 3,
        borderRadius: 20,
        flex: 0.3,
        borderColor: '#7a7877',
    },
    noBubble: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: 'none',
        borderRadius: 20,
        flex: 0.3,
    },
    header: {
        color: '#d4d4d4',
        padding: 20,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
        borderWidth: 3,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        top: '20%',
        width: '80%',
        elevation: 10,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingVertical: 40,
        borderWidth: 3,
        borderColor: '#d4d4d4',
        backgroundColor: '#292936',
        borderRadius: 20,
    },
    boldRed: {
        color: '#a60202',
        fontSize: 50,
        fontWeight: 'bold',
    },
    boldGreen: {
        color: '#01803a',
        fontSize: 50,
        fontWeight: 'bold',
    },
});
