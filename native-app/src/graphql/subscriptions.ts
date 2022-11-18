/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuestApi = /* GraphQL */ `
  subscription OnCreateQuestApi($filter: ModelSubscriptionQuestApiFilterInput) {
    onCreateQuestApi(filter: $filter) {
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
export const onUpdateQuestApi = /* GraphQL */ `
  subscription OnUpdateQuestApi($filter: ModelSubscriptionQuestApiFilterInput) {
    onUpdateQuestApi(filter: $filter) {
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
export const onDeleteQuestApi = /* GraphQL */ `
  subscription OnDeleteQuestApi($filter: ModelSubscriptionQuestApiFilterInput) {
    onDeleteQuestApi(filter: $filter) {
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
export const onCreateUserApi = /* GraphQL */ `
  subscription OnCreateUserApi($filter: ModelSubscriptionUserApiFilterInput) {
    onCreateUserApi(filter: $filter) {
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
export const onUpdateUserApi = /* GraphQL */ `
  subscription OnUpdateUserApi($filter: ModelSubscriptionUserApiFilterInput) {
    onUpdateUserApi(filter: $filter) {
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
export const onDeleteUserApi = /* GraphQL */ `
  subscription OnDeleteUserApi($filter: ModelSubscriptionUserApiFilterInput) {
    onDeleteUserApi(filter: $filter) {
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
