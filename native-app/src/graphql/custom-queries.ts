export const getUserApiStats = /* GraphQL */ `
	query GetUserApi($id: ID!) {
		getUserApi(id: $id) {
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
	}
`;

export const getUserApiHistory = /* GraphQL */ `
	query GetUserApi($id: ID!) {
		getUserApi(id: $id) {
			quest_history {
				quest_id
				quest_title
				completed_status
				start_time
				end_time
				completion_image
			}
		}
	}
`;
