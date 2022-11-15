/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestApi = /* GraphQL */ `
  query GetQuestApi($id: ID!) {
    getQuestApi(id: $id) {
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
export const listQuestApis = /* GraphQL */ `
  query ListQuestApis(
    $filter: ModelQuestApiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestApis(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
