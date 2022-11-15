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
