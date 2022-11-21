import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import awsExports from './src/aws-exports';
import { fetchUserById } from './utils/userApi';
import { Text } from 'react-native';
import { RegisteredUser, User } from './types';
import { CurrentUserProvider } from './context/Context';

Amplify.configure({
    ...awsExports,
    Analytics: {
        disabled: true,
    },
});

function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const [currentUser, setCurrentUser] = useState<User>({
        type: 'default',
        id: Auth.user.attributes.sub,
        image: 'https://picsum.photos/200/300',
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchUserById(currentUser.id).then(
            (user: RegisteredUser | null) => {
                if (user === null) {
                    setIsLoading(false);
                } else {
                    setCurrentUser(user);
                    setIsLoading(false);
                }
            }
        );
    }, []);

    if (!isLoadingComplete) {
        return null;
    } else if (isLoading) {
        return <Text>Loading</Text>;
    } else {
        return (
            <SafeAreaProvider>
                <CurrentUserProvider
                    value={{ currentUser, setCurrentUser }}
                >
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </CurrentUserProvider>
            </SafeAreaProvider>
        );
    }
}

export default withAuthenticator(App);
