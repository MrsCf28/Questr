/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getQuestApi = /* GraphQL */ `
  query GetQuestApi($id: ID!) {
    getQuestApi(id: $id) {
      id
      category
      title
      description
      location {
        latitude
        longitude
        region
      }
      createdAt
      updatedAt
      rewards {
        xp
        coins
        stamina
        wisdom
        dexterity
        perception
        exploration
        strength
      }
      time_limit_hours
      restrictions {
        min_age
        time_restriction
      }
      reviews {
        current_rating
        times_abandoned
        times_completed
      }
      objectives {
        desc
        endpoint
        method
      }
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
        id
        category
        title
        description
        location {
          latitude
          longitude
          region
        }
        createdAt
        updatedAt
        rewards {
          xp
          coins
          stamina
          wisdom
          dexterity
          perception
          exploration
          strength
        }
        time_limit_hours
        restrictions {
          min_age
          time_restriction
        }
        reviews {
          current_rating
          times_abandoned
          times_completed
        }
        objectives {
          desc
          endpoint
          method
        }
      }
      nextToken
    }
  }
`;
