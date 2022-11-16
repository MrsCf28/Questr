
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