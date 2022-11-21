/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createQuestApi = /* GraphQL */ `
  mutation CreateQuestApi(
    $input: CreateQuestApiInput!
    $condition: ModelQuestApiConditionInput
  ) {
    createQuestApi(input: $input, condition: $condition) {
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
export const updateQuestApi = /* GraphQL */ `
  mutation UpdateQuestApi(
    $input: UpdateQuestApiInput!
    $condition: ModelQuestApiConditionInput
  ) {
    updateQuestApi(input: $input, condition: $condition) {
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
export const deleteQuestApi = /* GraphQL */ `
  mutation DeleteQuestApi(
    $input: DeleteQuestApiInput!
    $condition: ModelQuestApiConditionInput
  ) {
    deleteQuestApi(input: $input, condition: $condition) {
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
export const createUserApi = /* GraphQL */ `
  mutation CreateUserApi(
    $input: CreateUserApiInput!
    $condition: ModelUserApiConditionInput
  ) {
    createUserApi(input: $input, condition: $condition) {
      id
      type
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
export const updateUserApi = /* GraphQL */ `
  mutation UpdateUserApi(
    $input: UpdateUserApiInput!
    $condition: ModelUserApiConditionInput
  ) {
    updateUserApi(input: $input, condition: $condition) {
      id
      type
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
export const deleteUserApi = /* GraphQL */ `
  mutation DeleteUserApi(
    $input: DeleteUserApiInput!
    $condition: ModelUserApiConditionInput
  ) {
    deleteUserApi(input: $input, condition: $condition) {
      id
      type
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
