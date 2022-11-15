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
