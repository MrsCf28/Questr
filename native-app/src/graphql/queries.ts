/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const questApi = /* GraphQL */ `
  query QuestApi {
    questApi {
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
export const userApi = /* GraphQL */ `
  query UserApi {
    userApi {
      id
      display_name
      image
      age
      current_quest_id
      avatar_uri
      owned_avatar_ids
      quest_history {
        quest_id
        quest_title
        completed_status
        start_time
        end_time
        completion_image
      }
      stats {
        xp
        coins
        stamina
        wisdom
        dexterity
        perception
        exploration
        strength
      }
      preferred_region
      createdAt
      updatedAt
    }
  }
`;
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
export const getUserApi = /* GraphQL */ `
  query GetUserApi($id: ID!) {
    getUserApi(id: $id) {
      id
      display_name
      image
      age
      current_quest_id
      avatar_uri
      owned_avatar_ids
      quest_history {
        quest_id
        quest_title
        completed_status
        start_time
        end_time
        completion_image
      }
      stats {
        xp
        coins
        stamina
        wisdom
        dexterity
        perception
        exploration
        strength
      }
      preferred_region
      createdAt
      updatedAt
    }
  }
`;
export const listUserApis = /* GraphQL */ `
  query ListUserApis(
    $filter: ModelUserApiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserApis(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        display_name
        image
        age
        current_quest_id
        avatar_uri
        owned_avatar_ids
        quest_history {
          quest_id
          quest_title
          completed_status
          start_time
          end_time
          completion_image
        }
        stats {
          xp
          coins
          stamina
          wisdom
          dexterity
          perception
          exploration
          strength
        }
        preferred_region
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
