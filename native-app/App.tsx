import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Amplify, API, graphqlOperation, Auth } from 'aws-amplify';
import { withAuthenticator } from "aws-amplify-react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { CurrentUser } from "./context/CurrentUser";
import { SignedUp } from './context/SignedUp';

import awsExports from "./src/aws-exports";
import { fetchQuestById } from "./utils/questApi";
import { fetchUserById } from "./utils/userApi";
import { addUser, fetchUser } from "./utils/userApi";
import EditProfileScreen from './screens/EditProfileScreen';
import { Text } from "react-native";

Amplify.configure({
    ...awsExports,
    Analytics: {
        disabled: true,
    },
});

function App() {

	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

    const [currentUser, setCurrentUser] = useState({
        image: 'https://picsum.photos/200/300',
    });
    const [id, setId] = useState(Auth.user.attributes.sub);
    const [userId, setUserId] = useState('4');
    const [newUser, setNewUser] = useState({ id: '24', age: 22 });
    const [signedUp, setSignedUp] = useState(true);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true)
        fetchUserById(id).then(user => {
            if (user === null) {
                setSignedUp(false);
                setCurrentUser({ ...currentUser, id: id });
                console.log(user, 'user if')
                setIsLoading(false)
            } else {
                setSignedUp(true);
                setCurrentUser(user);
                console.log(user, 'user else')
                setIsLoading(false)
            }   
        });
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else if (isLoading) {
        return <Text>Loading</Text>
    } else {
        return (
            <SafeAreaProvider>
                {console.log(currentUser, 'current')}
                <CurrentUser.Provider
                    value={{ currentUser, setCurrentUser }}
                >
                  <SignedUp.Provider
                  value={{ signedUp, setSignedUp }}
                  >
                        <Navigation signedUp={signedUp} colorScheme={colorScheme} />
                    <StatusBar />
                    </SignedUp.Provider>
                </CurrentUser.Provider>
            </SafeAreaProvider>
        );
    }
}

export default withAuthenticator(App);
