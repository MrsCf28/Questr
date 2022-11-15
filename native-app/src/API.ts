/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuestApiInput = {
  quest_id: string,
  created_at: string,
  description?: string | null,
  latitude: number,
  longtitude: number,
  time_limit_hours?: number | null,
  title?: string | null,
  id?: string | null,
};

export type ModelQuestApiConditionInput = {
  quest_id?: ModelIDInput | null,
  created_at?: ModelStringInput | null,
  description?: ModelStringInput | null,
  latitude?: ModelFloatInput | null,
  longtitude?: ModelFloatInput | null,
  time_limit_hours?: ModelIntInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelQuestApiConditionInput | null > | null,
  or?: Array< ModelQuestApiConditionInput | null > | null,
  not?: ModelQuestApiConditionInput | null,
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

export type ModelFloatInput = {
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
  quest_id: string,
  created_at: string,
  description?: string | null,
  latitude: number,
  longtitude: number,
  time_limit_hours?: number | null,
  title?: string | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateQuestApiInput = {
  quest_id?: string | null,
  created_at?: string | null,
  description?: string | null,
  latitude?: number | null,
  longtitude?: number | null,
  time_limit_hours?: number | null,
  title?: string | null,
  id: string,
};

export type DeleteQuestApiInput = {
  id: string,
};

export type ModelQuestApiFilterInput = {
  quest_id?: ModelIDInput | null,
  created_at?: ModelStringInput | null,
  description?: ModelStringInput | null,
  latitude?: ModelFloatInput | null,
  longtitude?: ModelFloatInput | null,
  time_limit_hours?: ModelIntInput | null,
  title?: ModelStringInput | null,
  and?: Array< ModelQuestApiFilterInput | null > | null,
  or?: Array< ModelQuestApiFilterInput | null > | null,
  not?: ModelQuestApiFilterInput | null,
};

export type ModelQuestApiConnection = {
  __typename: "ModelQuestApiConnection",
  items:  Array<QuestApi | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionQuestApiFilterInput = {
  quest_id?: ModelSubscriptionIDInput | null,
  created_at?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  latitude?: ModelSubscriptionFloatInput | null,
  longtitude?: ModelSubscriptionFloatInput | null,
  time_limit_hours?: ModelSubscriptionIntInput | null,
  title?: ModelSubscriptionStringInput | null,
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

export type ModelSubscriptionFloatInput = {
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
    quest_id: string,
    created_at: string,
    description?: string | null,
    latitude: number,
    longtitude: number,
    time_limit_hours?: number | null,
    title?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateQuestApiMutationVariables = {
  input: UpdateQuestApiInput,
  condition?: ModelQuestApiConditionInput | null,
};

export type UpdateQuestApiMutation = {
  updateQuestApi?:  {
    __typename: "QuestApi",
    quest_id: string,
    created_at: string,
    description?: string | null,
    latitude: number,
    longtitude: number,
    time_limit_hours?: number | null,
    title?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteQuestApiMutationVariables = {
  input: DeleteQuestApiInput,
  condition?: ModelQuestApiConditionInput | null,
};

export type DeleteQuestApiMutation = {
  deleteQuestApi?:  {
    __typename: "QuestApi",
    quest_id: string,
    created_at: string,
    description?: string | null,
    latitude: number,
    longtitude: number,
    time_limit_hours?: number | null,
    title?: string | null,
    id: string,
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
    quest_id: string,
    created_at: string,
    description?: string | null,
    latitude: number,
    longtitude: number,
    time_limit_hours?: number | null,
    title?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
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
      quest_id: string,
      created_at: string,
      description?: string | null,
      latitude: number,
      longtitude: number,
      time_limit_hours?: number | null,
      title?: string | null,
      id: string,
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
    quest_id: string,
    created_at: string,
    description?: string | null,
    latitude: number,
    longtitude: number,
    time_limit_hours?: number | null,
    title?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateQuestApiSubscriptionVariables = {
  filter?: ModelSubscriptionQuestApiFilterInput | null,
};

export type OnUpdateQuestApiSubscription = {
  onUpdateQuestApi?:  {
    __typename: "QuestApi",
    quest_id: string,
    created_at: string,
    description?: string | null,
    latitude: number,
    longtitude: number,
    time_limit_hours?: number | null,
    title?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteQuestApiSubscriptionVariables = {
  filter?: ModelSubscriptionQuestApiFilterInput | null,
};

export type OnDeleteQuestApiSubscription = {
  onDeleteQuestApi?:  {
    __typename: "QuestApi",
    quest_id: string,
    created_at: string,
    description?: string | null,
    latitude: number,
    longtitude: number,
    time_limit_hours?: number | null,
    title?: string | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
