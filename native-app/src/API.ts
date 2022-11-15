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
  endpoint?: string | null,
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
  endpoint?: string | null,
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
      endpoint?: string | null,
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
      endpoint?: string | null,
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
      endpoint?: string | null,
      method?: string | null,
    } | null > | null,
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
      endpoint?: string | null,
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
        endpoint?: string | null,
        method?: string | null,
      } | null > | null,
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
      endpoint?: string | null,
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
      endpoint?: string | null,
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
      endpoint?: string | null,
      method?: string | null,
    } | null > | null,
  } | null,
};
