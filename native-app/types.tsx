/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
    CompositeScreenProps,
    NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

export type RootStackParamList = {
    Root: NavigatorScreenParams<RootTabParamList> | undefined;
    CurrentQuest: undefined;
    NotFound: undefined;
    AcceptQuest: undefined;
    EditProfile: undefined;
    CameraScreen: undefined;
    AvatarSelector: undefined;
    CompletedQuestScreen: undefined;
};

export type RootStackScreenProps<
    Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};

export type RootTabScreenProps<
    Screen extends keyof RootTabParamList
> = CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
>;

export type RegisteredUser = {
    type: 'registered';
    id: string;
    display_name: string;
    age: number;
    preferred_region: Array<string | null>;
    image: string;
    current_quest_id: string;
    quest_history: Array<object | null>;
    owned_avatar_ids: Array<number>;
    avatar_uri: string;
    stats: {
        dexterity: number;
        exploration: number;
        perception: number;
        stamina: number;
        strength: number;
        wisdom: number;
        xp: number;
        coins: number;
    };
};

export type DefaultUser = {
    type: 'default';
    id: string;
    image: string;
};

export type User = RegisteredUser | DefaultUser;
