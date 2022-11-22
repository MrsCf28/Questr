import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Amplify, Auth } from 'aws-amplify';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
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
        return <LoadingComponent/>
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

const customTheme = {...AmplifyTheme, 
    button: {
        margin: 20,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
        borderWidth: 3,
        padding: 12,
        color: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionFooterLink: {
        margin: 10,
        borderColor: '#7a7877',
        backgroundColor: '#014c54',
        borderWidth: 3,
        padding: 10,
        color: 'white',
        borderRadius: 20,
        paddingTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
	},
    buttonDisabled: {
        margin: 20,
        borderColor: '#7a7877',
        backgroundColor: '#4a040c',
        borderWidth: 3,
        padding: 10,
        color: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
	},
    input: {...AmplifyTheme.input,
        borderRadius: 20
    },
    phoneInput: {...AmplifyTheme.phoneInput,
        borderRadius: 20
    },
    inputLabel: {
		marginBottom: 8,
        marginHorizontal: 15
	},
};

export default withAuthenticator(App, {theme: customTheme});
