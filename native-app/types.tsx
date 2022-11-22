import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
    CompositeScreenProps,
    NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Objectives, Restrictions, Reviews, Rewards } from './src/API';

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
    CompletedQuestScreen:
        | NavigatorScreenParams<ActiveQuestScreenParams>
        | undefined;
    ActiveQuestScreen: undefined;
    TabTwo: undefined;
};

export type RootStackScreenProps<
    Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};

export type ActiveQuestScreenParams = {
    currentQuest: any;
    currentUser: RegisteredUser;
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

export type UpdatedUser = {
    type?: 'updated';
    id: string;
    display_name?: string;
    age?: number;
    preferred_region?: Array<string | null>;
    image?: string;
    current_quest_id?: string;
    quest_history?: Array<object | null>;
    owned_avatar_ids?: Array<number>;
    avatar_uri?: string;
    stats?: {
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
export type UpdatedQuest = {
  type?: "updated";
  id: string;
  category?: string | null;
  title?: string | null;
  description?: string | null;
  location?: Object | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  rewards?: Object | null;
  time_limit_hours?: number | null;
  restrictions?: Object | null;
  reviews?: {
    current_rating: number;
    times_abandoned: number;
    times_completed: number;
  };
  objectives?: Array<Object | null> | null;
};

export type DefaultUser = {
    type: 'default';
    id: string;
    image: string;
};

export type User = RegisteredUser | DefaultUser | UpdatedUser;

export type CurrentStep = {
    desc: string;
    method: string;
    endpoint: Array<String>;
};

export type Coordinate = {
    latitude: number;
    longitude: number;
}

export type ExtendedCoordinate = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export type CompletedSteps = Array<CurrentStep>;

export type Enemy = {
    name: string;
    image: any;
    dexterity: number;
    perception: number;
    wisdom: number;
    exploration: number;
    strength: number;
    stamina: number;
    health: number;
};

export type Attack = {
    myMove: string;
    enemyAttack: string;
    myDamageAmount: number;
    myDamage: boolean;
    enemyDamageAmount: number;
    enemyDamage: boolean;
    statement: string;
};

export type Quest = {
    id: string;
    category: string;
    title: string;
    description: string;
    location: ExtendedCoordinate;
    createdAt?: string;
    updatedAt?: string;
    rewards?: Rewards | null,
    time_limit_hours: number,
    restrictions?: Restrictions | null,
    reviews?: Reviews | null,
    objectives?:  Array<Objectives | null > | null,
}

export type QuestHistoryItem = {
    quest_id: string,
    quest_title: string,
    completed_status: string,
    start_time: string,
    end_time?: string | null,
    completion_image?: string | null,
  };

export type QuestProp = {
    quest: Quest;
  }

  export type QuestHistoryProp = {
    quest: QuestHistoryItem;
  }
