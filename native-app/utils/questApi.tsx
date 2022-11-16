import { API, graphqlOperation } from 'aws-amplify';
import { getQuestApi, listQuestApis } from '../src/graphql/queries';


export async function fetchAllQuests() {
    try {
        const questData = await API.graphql(
            graphqlOperation(listQuestApis)
        );
        const questList = questData.data.listQuestApis.items;
        console.log(questList);
    } catch (err) {
        console.log('ERROR fetching questLists: ', err);
    }
}

export async function fetchQuestById(id: string) {
    try {
        const trialQuest = await API.graphql(
            graphqlOperation(getQuestApi, { id: id })
        );
        // console.log(trialQuest.data.getQuestApi);
        // console.log(trialQuest.data.getQuestApi.objectives[0].endpoint);
    } catch (err) {
        console.log('ERROR fetching questById: ', err);
    }
}
