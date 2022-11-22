// export const getUserApiStats = /* GraphQL */ `
// 	query GetUserApiStats($id: ID!) {
// 		getUserApi(id: $id) {
// 			stats {
// 				xp
// 				coins
// 				stamina
// 				wisdom
// 				dexterity
// 				perception
// 				exploration
// 				strength
// 			}
// 		}
// 	}
// `;
// export const getUserApiHistory = /* GraphQL */ `
// 	query GetUserApiHistory($id: ID!) {
// 		getUserApi(id: $id) {
// 			quest_history {
// 				quest_id
// 				quest_title
// 				completed_status
// 				start_time
// 				end_time
// 				completion_image
// 			}
// 		}
// 	}
// `;
// export const getUserApiHistory = /* GraphQL */ `
// 	query GetUserApi($id: ID!) {
// 		getUserApi(id: $id) {
// 			quest_history {
// 				quest_id
// 				quest_title
// 				completed_status
// 				start_time
// 				end_time
// 				completion_image
// 			}
// 		}
// 	}
// `;

export const listUserStatsApi = /* GraphQL */ `
query ListUserApis(
    $filter: ModelUserApiFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserApis(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        display_name
        image
        avatar_uri
        owned_avatar_ids
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
      }
      nextToken
    }
  }
`;

