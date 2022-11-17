
export const locationChecker = (questLocation, myLocation, accuracy) => {
    console.log(myLocation, questLocation)
    const me = {lat: myLocation.latitude.toFixed(accuracy), long: myLocation.longitude.toFixed(accuracy)}
    const quest = {lat: questLocation.latitude.toFixed(accuracy), long: questLocation.longitude.toFixed(accuracy)}
    if(me.lat === quest.lat && me.long === quest.long) {
        return 'true'
    } else {
        return 'false'
    }
}

export function formatUserStats({
	dexterity,
	exploration,
	perception,
	stamina,
	strength,
	wisdom,
}: {
	stamina: number;
	wisdom: number;
	dexterity: number;
	perception: number;
	exploration: number;
	strength: number;
}) {

	const maxStatOnRadarChart = (Math.max.apply(
		Math,
		Object.values({
			dexterity,
			exploration,
			perception,
			stamina,
			strength,
			wisdom,
		})
	))*0.9;

	const formattedStats: number[] = [
		dexterity/maxStatOnRadarChart,
		exploration/maxStatOnRadarChart,
		perception/maxStatOnRadarChart,
		stamina/maxStatOnRadarChart,
		strength/maxStatOnRadarChart,
		wisdom/maxStatOnRadarChart,
	];

	return formattedStats;
}
