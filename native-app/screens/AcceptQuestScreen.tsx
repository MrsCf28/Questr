import React from 'react';
import { TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import {
    useNavigation,
} from '@react-navigation/native';
import { Text, View } from '../components/Themed';
import { patchUser } from '../utils/userApi';
import {
    useCurrentUser,
    useRegisteredUser,
} from '../context/Context';

export default function AcceptQuestScreen({ route }: any) {
    const navigation = useNavigation();

    const { setCurrentUser } = useCurrentUser();
    const { currentUser } = useRegisteredUser();

    const quest = route.params;

    function acceptQuest() {
      
        const updatedUser = {
            id: currentUser.id,
            current_quest_id: quest.id,
        };

        patchUser(updatedUser)
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((err: any) => {
                console.log('error in patch user', err);
            });
        navigation.navigate('TabTwo');
    }

  return (
  <View style={styles.main}>
      <ImageBackground source={require('../assets/images/stones.jpg')} style={styles.container} resizeMode="cover">
        <ImageBackground source={require('../assets/images/bigScroll.png')} resizeMode="cover" style={styles.scroll}>
          <View style={styles.holder}>
            <Text style={styles.title}>{quest.title}</Text>
            <View style={styles.container}>
              <Text style={styles.text}>Quest Type: {quest.category}</Text>
              <Text>Time Limit: {quest.time_limit_hours} hr</Text>
            </View>
            <View style={styles.container}>
              <Text>{quest.rewards.coins} Coins {quest.rewards.xp}XP</Text>
            </View>
            <View style={styles.container}>
              <Text>{quest.description}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={acceptQuest}>
              <Text style={styles.buttonText}>Accept Quest</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ImageBackground>
    </View>
  )
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
    text: {
      textTransform: "capitalize",
    }
  });
