/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestApi = /* GraphQL */ `
  mutation CreateQuestApi(
    $input: CreateQuestApiInput!
    $condition: ModelQuestApiConditionInput
  ) {
    createQuestApi(input: $input, condition: $condition) {
      quest_id
      created_at
      description
      latitude
      longtitude
      time_limit_hours
      title
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateQuestApi = /* GraphQL */ `
  mutation UpdateQuestApi(
    $input: UpdateQuestApiInput!
    $condition: ModelQuestApiConditionInput
  ) {
    updateQuestApi(input: $input, condition: $condition) {
      quest_id
      created_at
      description
      latitude
      longtitude
      time_limit_hours
      title
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteQuestApi = /* GraphQL */ `
  mutation DeleteQuestApi(
    $input: DeleteQuestApiInput!
    $condition: ModelQuestApiConditionInput
  ) {
    deleteQuestApi(input: $input, condition: $condition) {
      quest_id
      created_at
      description
      latitude
      longtitude
      time_limit_hours
      title
      id
      createdAt
      updatedAt
    }
  }
`;
