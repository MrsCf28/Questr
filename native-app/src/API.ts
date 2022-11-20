/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuestApiInput = {
  id?: string | null,
  category: string,
  title: string,
  description: string,
  location?: LocationInput | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  rewards?: RewardsInput | null,
  time_limit_hours: number,
  restrictions?: RestrictionsInput | null,
  reviews?: ReviewsInput | null,
  objectives?: Array< ObjectivesInput | null > | null,
};

export type LocationInput = {
  latitude: number,
  longitude: number,
  region: string,
};

export type RewardsInput = {
  xp: number,
  coins: number,
  stamina: number,
  wisdom: number,
  dexterity: number,
  perception: number,
  exploration: number,
  strength: number,
};

export type RestrictionsInput = {
  min_age: number,
  time_restriction: string,
};

export type ReviewsInput = {
  current_rating: number,
  times_abandoned: number,
  times_completed: number,
};

export type ObjectivesInput = {
  desc?: string | null,
  endpoint?: Array< string | null > | null,
  method?: string | null,
};

export type ModelQuestApiConditionInput = {
  category?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  time_limit_hours?: ModelIntInput | null,
  and?: Array< ModelQuestApiConditionInput | null > | null,
  or?: Array< ModelQuestApiConditionInput | null > | null,
  not?: ModelQuestApiConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type QuestApi = {
  __typename: "QuestApi",
  id: string,
  category: string,
  title: string,
  description: string,
  location?: Location | null,
  createdAt: string,
  updatedAt: string,
  rewards?: Rewards | null,
  time_limit_hours: number,
  restrictions?: Restrictions | null,
  reviews?: Reviews | null,
  objectives?:  Array<Objectives | null > | null,
};

export type Location = {
  __typename: "Location",
  latitude: number,
  longitude: number,
  region: string,
};

export type Rewards = {
  __typename: "Rewards",
  xp: number,
  coins: number,
  stamina: number,
  wisdom: number,
  dexterity: number,
  perception: number,
  exploration: number,
  strength: number,
};

export type Restrictions = {
  __typename: "Restrictions",
  min_age: number,
  time_restriction: string,
};

export type Reviews = {
  __typename: "Reviews",
  current_rating: number,
  times_abandoned: number,
  times_completed: number,
};

export type Objectives = {
  __typename: "Objectives",
  desc?: string | null,
  endpoint?: Array< string | null > | null,
  method?: string | null,
};

export type UpdateQuestApiInput = {
  id: string,
  category?: string | null,
  title?: string | null,
  description?: string | null,
  location?: LocationInput | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  rewards?: RewardsInput | null,
  time_limit_hours?: number | null,
  restrictions?: RestrictionsInput | null,
  reviews?: ReviewsInput | null,
  objectives?: Array< ObjectivesInput | null > | null,
};

export type DeleteQuestApiInput = {
  id: string,
};

export type CreateUserApiInput = {
  id?: string | null,
  type?: string | null,
  display_name?: string | null,
  image?: string | null,
  age: number,
  current_quest_id: string,
  avatar_uri?: string | null,
  owned_avatar_ids?: Array< number | null > | null,
  quest_history?: Array< QuestHistoryInput | null > | null,
  stats?: RewardsInput | null,
  preferred_region?: Array< string | null > | null,
};

export type QuestHistoryInput = {
  quest_id: string,
  quest_title: string,
  completed_status: string,
  start_time: string,
  end_time?: string | null,
  completion_image?: string | null,
};

export type ModelUserApiConditionInput = {
  type?: ModelStringInput | null,
  display_name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  age?: ModelIntInput | null,
  current_quest_id?: ModelStringInput | null,
  avatar_uri?: ModelStringInput | null,
  owned_avatar_ids?: ModelIntInput | null,
  preferred_region?: ModelStringInput | null,
  and?: Array< ModelUserApiConditionInput | null > | null,
  or?: Array< ModelUserApiConditionInput | null > | null,
  not?: ModelUserApiConditionInput | null,
};

export type UserApi = {
  __typename: "UserApi",
  id: string,
  type?: string | null,
  display_name?: string | null,
  image?: string | null,
  age: number,
  current_quest_id: string,
  avatar_uri?: string | null,
  owned_avatar_ids?: Array< number | null > | null,
  quest_history?:  Array<QuestHistory | null > | null,
  stats?: Rewards | null,
  preferred_region?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
};

export type QuestHistory = {
  __typename: "QuestHistory",
  quest_id: string,
  quest_title: string,
  completed_status: string,
  start_time: string,
  end_time?: string | null,
  completion_image?: string | null,
};

export type UpdateUserApiInput = {
  id: string,
  type?: string | null,
  display_name?: string | null,
  image?: string | null,
  age?: number | null,
  current_quest_id?: string | null,
  avatar_uri?: string | null,
  owned_avatar_ids?: Array< number | null > | null,
  quest_history?: Array< QuestHistoryInput | null > | null,
  stats?: RewardsInput | null,
  preferred_region?: Array< string | null > | null,
};

export type DeleteUserApiInput = {
  id: string,
};

export type ModelQuestApiFilterInput = {
  id?: ModelIDInput | null,
  category?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  time_limit_hours?: ModelIntInput | null,
  and?: Array< ModelQuestApiFilterInput | null > | null,
  or?: Array< ModelQuestApiFilterInput | null > | null,
  not?: ModelQuestApiFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelQuestApiConnection = {
  __typename: "ModelQuestApiConnection",
  items:  Array<QuestApi | null >,
  nextToken?: string | null,
};

export type ModelUserApiFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  display_name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  age?: ModelIntInput | null,
  current_quest_id?: ModelStringInput | null,
  avatar_uri?: ModelStringInput | null,
  owned_avatar_ids?: ModelIntInput | null,
  preferred_region?: ModelStringInput | null,
  and?: Array< ModelUserApiFilterInput | null > | null,
  or?: Array< ModelUserApiFilterInput | null > | null,
  not?: ModelUserApiFilterInput | null,
};

export type ModelUserApiConnection = {
  __typename: "ModelUserApiConnection",
  items:  Array<UserApi | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionQuestApiFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  category?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  time_limit_hours?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionQuestApiFilterInput | null > | null,
  or?: Array< ModelSubscriptionQuestApiFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserApiFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  display_name?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  age?: ModelSubscriptionIntInput | null,
  current_quest_id?: ModelSubscriptionStringInput | null,
  avatar_uri?: ModelSubscriptionStringInput | null,
  owned_avatar_ids?: ModelSubscriptionIntInput | null,
  preferred_region?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserApiFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserApiFilterInput | null > | null,
};

export type CreateQuestApiMutationVariables = {
  input: CreateQuestApiInput,
  condition?: ModelQuestApiConditionInput | null,
};

export type CreateQuestApiMutation = {
  createQuestApi?:  {
    __typename: "QuestApi",
    id: string,
    category: string,
    title: string,
    description: string,
    location?:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    rewards?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    time_limit_hours: number,
    restrictions?:  {
      __typename: "Restrictions",
      min_age: number,
      time_restriction: string,
    } | null,
    reviews?:  {
      __typename: "Reviews",
      current_rating: number,
      times_abandoned: number,
      times_completed: number,
    } | null,
    objectives?:  Array< {
      __typename: "Objectives",
      desc?: string | null,
      endpoint?: Array< string | null > | null,
      method?: string | null,
    } | null > | null,
  } | null,
};

export type UpdateQuestApiMutationVariables = {
  input: UpdateQuestApiInput,
  condition?: ModelQuestApiConditionInput | null,
};

export type UpdateQuestApiMutation = {
  updateQuestApi?:  {
    __typename: "QuestApi",
    id: string,
    category: string,
    title: string,
    description: string,
    location?:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    rewards?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    time_limit_hours: number,
    restrictions?:  {
      __typename: "Restrictions",
      min_age: number,
      time_restriction: string,
    } | null,
    reviews?:  {
      __typename: "Reviews",
      current_rating: number,
      times_abandoned: number,
      times_completed: number,
    } | null,
    objectives?:  Array< {
      __typename: "Objectives",
      desc?: string | null,
      endpoint?: Array< string | null > | null,
      method?: string | null,
    } | null > | null,
  } | null,
};

export type DeleteQuestApiMutationVariables = {
  input: DeleteQuestApiInput,
  condition?: ModelQuestApiConditionInput | null,
};

export type DeleteQuestApiMutation = {
  deleteQuestApi?:  {
    __typename: "QuestApi",
    id: string,
    category: string,
    title: string,
    description: string,
    location?:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    rewards?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    time_limit_hours: number,
    restrictions?:  {
      __typename: "Restrictions",
      min_age: number,
      time_restriction: string,
    } | null,
    reviews?:  {
      __typename: "Reviews",
      current_rating: number,
      times_abandoned: number,
      times_completed: number,
    } | null,
    objectives?:  Array< {
      __typename: "Objectives",
      desc?: string | null,
      endpoint?: Array< string | null > | null,
      method?: string | null,
    } | null > | null,
  } | null,
};

export type CreateUserApiMutationVariables = {
  input: CreateUserApiInput,
  condition?: ModelUserApiConditionInput | null,
};

export type CreateUserApiMutation = {
  createUserApi?:  {
    __typename: "UserApi",
    id: string,
    type?: string | null,
    display_name?: string | null,
    image?: string | null,
    age: number,
    current_quest_id: string,
    avatar_uri?: string | null,
    owned_avatar_ids?: Array< number | null > | null,
    quest_history?:  Array< {
      __typename: "QuestHistory",
      quest_id: string,
      quest_title: string,
      completed_status: string,
      start_time: string,
      end_time?: string | null,
      completion_image?: string | null,
    } | null > | null,
    stats?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    preferred_region?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserApiMutationVariables = {
  input: UpdateUserApiInput,
  condition?: ModelUserApiConditionInput | null,
};

export type UpdateUserApiMutation = {
  updateUserApi?:  {
    __typename: "UserApi",
    id: string,
    type?: string | null,
    display_name?: string | null,
    image?: string | null,
    age: number,
    current_quest_id: string,
    avatar_uri?: string | null,
    owned_avatar_ids?: Array< number | null > | null,
    quest_history?:  Array< {
      __typename: "QuestHistory",
      quest_id: string,
      quest_title: string,
      completed_status: string,
      start_time: string,
      end_time?: string | null,
      completion_image?: string | null,
    } | null > | null,
    stats?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    preferred_region?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserApiMutationVariables = {
  input: DeleteUserApiInput,
  condition?: ModelUserApiConditionInput | null,
};

export type DeleteUserApiMutation = {
  deleteUserApi?:  {
    __typename: "UserApi",
    id: string,
    type?: string | null,
    display_name?: string | null,
    image?: string | null,
    age: number,
    current_quest_id: string,
    avatar_uri?: string | null,
    owned_avatar_ids?: Array< number | null > | null,
    quest_history?:  Array< {
      __typename: "QuestHistory",
      quest_id: string,
      quest_title: string,
      completed_status: string,
      start_time: string,
      end_time?: string | null,
      completion_image?: string | null,
    } | null > | null,
    stats?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    preferred_region?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type QuestApiQuery = {
  questApi?:  {
    __typename: "QuestApi",
    id: string,
    category: string,
    title: string,
    description: string,
    location?:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    rewards?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    time_limit_hours: number,
    restrictions?:  {
      __typename: "Restrictions",
      min_age: number,
      time_restriction: string,
    } | null,
    reviews?:  {
      __typename: "Reviews",
      current_rating: number,
      times_abandoned: number,
      times_completed: number,
    } | null,
    objectives?:  Array< {
      __typename: "Objectives",
      desc?: string | null,
      endpoint?: Array< string | null > | null,
      method?: string | null,
    } | null > | null,
  } | null,
};

export type UserApiQuery = {
  userApi?:  {
    __typename: "UserApi",
    id: string,
    type?: string | null,
    display_name?: string | null,
    image?: string | null,
    age: number,
    current_quest_id: string,
    avatar_uri?: string | null,
    owned_avatar_ids?: Array< number | null > | null,
    quest_history?:  Array< {
      __typename: "QuestHistory",
      quest_id: string,
      quest_title: string,
      completed_status: string,
      start_time: string,
      end_time?: string | null,
      completion_image?: string | null,
    } | null > | null,
    stats?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    preferred_region?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetQuestApiQueryVariables = {
  id: string,
};

export type GetQuestApiQuery = {
  getQuestApi?:  {
    __typename: "QuestApi",
    id: string,
    category: string,
    title: string,
    description: string,
    location?:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    rewards?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    time_limit_hours: number,
    restrictions?:  {
      __typename: "Restrictions",
      min_age: number,
      time_restriction: string,
    } | null,
    reviews?:  {
      __typename: "Reviews",
      current_rating: number,
      times_abandoned: number,
      times_completed: number,
    } | null,
    objectives?:  Array< {
      __typename: "Objectives",
      desc?: string | null,
      endpoint?: Array< string | null > | null,
      method?: string | null,
    } | null > | null,
  } | null,
};

export type ListQuestApisQueryVariables = {
  filter?: ModelQuestApiFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListQuestApisQuery = {
  listQuestApis?:  {
    __typename: "ModelQuestApiConnection",
    items:  Array< {
      __typename: "QuestApi",
      id: string,
      category: string,
      title: string,
      description: string,
      location?:  {
        __typename: "Location",
        latitude: number,
        longitude: number,
        region: string,
      } | null,
      createdAt: string,
      updatedAt: string,
      rewards?:  {
        __typename: "Rewards",
        xp: number,
        coins: number,
        stamina: number,
        wisdom: number,
        dexterity: number,
        perception: number,
        exploration: number,
        strength: number,
      } | null,
      time_limit_hours: number,
      restrictions?:  {
        __typename: "Restrictions",
        min_age: number,
        time_restriction: string,
      } | null,
      reviews?:  {
        __typename: "Reviews",
        current_rating: number,
        times_abandoned: number,
        times_completed: number,
      } | null,
      objectives?:  Array< {
        __typename: "Objectives",
        desc?: string | null,
        endpoint?: Array< string | null > | null,
        method?: string | null,
      } | null > | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserApiQueryVariables = {
  id: string,
};

export type GetUserApiQuery = {
  getUserApi?:  {
    __typename: "UserApi",
    id: string,
    type?: string | null,
    display_name?: string | null,
    image?: string | null,
    age: number,
    current_quest_id: string,
    avatar_uri?: string | null,
    owned_avatar_ids?: Array< number | null > | null,
    quest_history?:  Array< {
      __typename: "QuestHistory",
      quest_id: string,
      quest_title: string,
      completed_status: string,
      start_time: string,
      end_time?: string | null,
      completion_image?: string | null,
    } | null > | null,
    stats?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    preferred_region?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserApisQueryVariables = {
  filter?: ModelUserApiFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserApisQuery = {
  listUserApis?:  {
    __typename: "ModelUserApiConnection",
    items:  Array< {
      __typename: "UserApi",
      id: string,
      type?: string | null,
      display_name?: string | null,
      image?: string | null,
      age: number,
      current_quest_id: string,
      avatar_uri?: string | null,
      owned_avatar_ids?: Array< number | null > | null,
      quest_history?:  Array< {
        __typename: "QuestHistory",
        quest_id: string,
        quest_title: string,
        completed_status: string,
        start_time: string,
        end_time?: string | null,
        completion_image?: string | null,
      } | null > | null,
      stats?:  {
        __typename: "Rewards",
        xp: number,
        coins: number,
        stamina: number,
        wisdom: number,
        dexterity: number,
        perception: number,
        exploration: number,
        strength: number,
      } | null,
      preferred_region?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateQuestApiSubscriptionVariables = {
  filter?: ModelSubscriptionQuestApiFilterInput | null,
};

export type OnCreateQuestApiSubscription = {
  onCreateQuestApi?:  {
    __typename: "QuestApi",
    id: string,
    category: string,
    title: string,
    description: string,
    location?:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    rewards?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    time_limit_hours: number,
    restrictions?:  {
      __typename: "Restrictions",
      min_age: number,
      time_restriction: string,
    } | null,
    reviews?:  {
      __typename: "Reviews",
      current_rating: number,
      times_abandoned: number,
      times_completed: number,
    } | null,
    objectives?:  Array< {
      __typename: "Objectives",
      desc?: string | null,
      endpoint?: Array< string | null > | null,
      method?: string | null,
    } | null > | null,
  } | null,
};

export type OnUpdateQuestApiSubscriptionVariables = {
  filter?: ModelSubscriptionQuestApiFilterInput | null,
};

export type OnUpdateQuestApiSubscription = {
  onUpdateQuestApi?:  {
    __typename: "QuestApi",
    id: string,
    category: string,
    title: string,
    description: string,
    location?:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    rewards?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    time_limit_hours: number,
    restrictions?:  {
      __typename: "Restrictions",
      min_age: number,
      time_restriction: string,
    } | null,
    reviews?:  {
      __typename: "Reviews",
      current_rating: number,
      times_abandoned: number,
      times_completed: number,
    } | null,
    objectives?:  Array< {
      __typename: "Objectives",
      desc?: string | null,
      endpoint?: Array< string | null > | null,
      method?: string | null,
    } | null > | null,
  } | null,
};

export type OnDeleteQuestApiSubscriptionVariables = {
  filter?: ModelSubscriptionQuestApiFilterInput | null,
};

export type OnDeleteQuestApiSubscription = {
  onDeleteQuestApi?:  {
    __typename: "QuestApi",
    id: string,
    category: string,
    title: string,
    description: string,
    location?:  {
      __typename: "Location",
      latitude: number,
      longitude: number,
      region: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    rewards?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    time_limit_hours: number,
    restrictions?:  {
      __typename: "Restrictions",
      min_age: number,
      time_restriction: string,
    } | null,
    reviews?:  {
      __typename: "Reviews",
      current_rating: number,
      times_abandoned: number,
      times_completed: number,
    } | null,
    objectives?:  Array< {
      __typename: "Objectives",
      desc?: string | null,
      endpoint?: Array< string | null > | null,
      method?: string | null,
    } | null > | null,
  } | null,
};

export type OnCreateUserApiSubscriptionVariables = {
  filter?: ModelSubscriptionUserApiFilterInput | null,
};

export type OnCreateUserApiSubscription = {
  onCreateUserApi?:  {
    __typename: "UserApi",
    id: string,
    type?: string | null,
    display_name?: string | null,
    image?: string | null,
    age: number,
    current_quest_id: string,
    avatar_uri?: string | null,
    owned_avatar_ids?: Array< number | null > | null,
    quest_history?:  Array< {
      __typename: "QuestHistory",
      quest_id: string,
      quest_title: string,
      completed_status: string,
      start_time: string,
      end_time?: string | null,
      completion_image?: string | null,
    } | null > | null,
    stats?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    preferred_region?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserApiSubscriptionVariables = {
  filter?: ModelSubscriptionUserApiFilterInput | null,
};

export type OnUpdateUserApiSubscription = {
  onUpdateUserApi?:  {
    __typename: "UserApi",
    id: string,
    type?: string | null,
    display_name?: string | null,
    image?: string | null,
    age: number,
    current_quest_id: string,
    avatar_uri?: string | null,
    owned_avatar_ids?: Array< number | null > | null,
    quest_history?:  Array< {
      __typename: "QuestHistory",
      quest_id: string,
      quest_title: string,
      completed_status: string,
      start_time: string,
      end_time?: string | null,
      completion_image?: string | null,
    } | null > | null,
    stats?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    preferred_region?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserApiSubscriptionVariables = {
  filter?: ModelSubscriptionUserApiFilterInput | null,
};

export type OnDeleteUserApiSubscription = {
  onDeleteUserApi?:  {
    __typename: "UserApi",
    id: string,
    type?: string | null,
    display_name?: string | null,
    image?: string | null,
    age: number,
    current_quest_id: string,
    avatar_uri?: string | null,
    owned_avatar_ids?: Array< number | null > | null,
    quest_history?:  Array< {
      __typename: "QuestHistory",
      quest_id: string,
      quest_title: string,
      completed_status: string,
      start_time: string,
      end_time?: string | null,
      completion_image?: string | null,
    } | null > | null,
    stats?:  {
      __typename: "Rewards",
      xp: number,
      coins: number,
      stamina: number,
      wisdom: number,
      dexterity: number,
      perception: number,
      exploration: number,
      strength: number,
    } | null,
    preferred_region?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
