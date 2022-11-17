import { API, graphqlOperation } from 'aws-amplify';
import { getQuestApi, listQuestApis, listUserApis } from '../src/graphql/queries';


export async function fetchAllQuests() {
    try {
        const questData = await API.graphql(
            graphqlOperation(listQuestApis)
        );
        const questList = questData.data.listQuestApis.items;
        // console.log(questList);
        return questList
    } catch (err) {
        console.log('ERROR fetching questLists: ', err);
    }
}

export async function fetchQuestById(id: string) {
   return API.graphql(
            graphqlOperation(getQuestApi, { id: id })
        ).then((quest) => {
            return quest.data.getQuestApi;
        });
    
}