export const initialRewards = {
    __typename: 'Rewards',
    xp: 0,
    coins: 0,
    stamina: 0,
    wisdom: 0,
    dexterity: 0,
    perception: 0,
    exploration: 0,
    strength: 0,
};

export const initialObjectives = [
    {
        __typename: 'Objectives',
        desc: '',
        endpoint: '',
        method: '',
    },
];

export const initialQuest = {
    id: '',
    category: '',
    title: '',
    description: '',
    location: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    },
    createdAt: '',
    updatedAt: '',
    rewards: initialRewards,
    time_limit_hours: 0,
    restrictions: {},
    reviews: {},
    objectives: initialObjectives,
};