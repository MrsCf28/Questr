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
import LoadingComponent from './components/LoadingComponent';

Amplify.configure({
    ...awsExports,
    Analytics: {
        disabled: true,
    },
    Storage: {
        AWSS3: {
            bucket: 'questr-image-bucket', //REQUIRED -  Amazon S3 bucket name
            region: 'eu-west-2', //OPTIONAL -  Amazon service region
        },
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
        return <LoadingComponent/>
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
