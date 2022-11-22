import { Coordinate } from "../types";


export const locationChecker = (
	questLocation: Coordinate,
	myLocation: Coordinate,
	accuracy: number
) => {
	const me = {
		lat: myLocation.latitude.toFixed(accuracy),
		long: myLocation.longitude.toFixed(accuracy),
	};
	const quest = {
		lat: questLocation.latitude.toFixed(accuracy),
		long: questLocation.longitude.toFixed(accuracy),
	};
	if (me.lat === quest.lat && me.long === quest.long) {
		return "true";
	} else {
		return "false";
	}
};

export function formatUserStats({
	dexterity,
	exploration,
	perception,
	stamina,
	strength,
	wisdom,
}: {
	dexterity: number;
	exploration: number;
	perception: number;
	stamina: number;
	strength: number;
	wisdom: number;
}) {
	const maxStatOnRadarChart =
		Math.max.apply(
			Math,
			Object.values({
				dexterity,
				exploration,
				perception,
				stamina,
				strength,
				wisdom,
			})
		) / 0.8;

	const formattedStats: number[] = [
		wisdom / maxStatOnRadarChart,
		dexterity / maxStatOnRadarChart,
		exploration / maxStatOnRadarChart,
		perception / maxStatOnRadarChart,
		stamina / maxStatOnRadarChart,
		strength / maxStatOnRadarChart,
	];

	return formattedStats;
}

export function missingWordGame(
	requiredWords: string[],
	guessedWords: string[]
) {
	for (let i = 0; i < requiredWords.length; i++) {
		if (guessedWords[i].toLowerCase() !== requiredWords[i].toLowerCase()) {
			return false;
		}
	}
	return true;
}
