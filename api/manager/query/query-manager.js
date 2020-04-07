const QueryReadManager = require('./query-read-manager');
const QueryWriteManager = require('./query-write-manager');

async function createQuery(query){
    return await QueryWriteManager.createQuery(query)
}

async function addResponseToQuery(response){
    return await QueryWriteManager.addResponseToQuery(response)
}

async function listQueries(){
    return await QueryReadManager.listQueries()
}

async function viewQuery(queryId){
    return await QueryReadManager.viewQuery(queryId)
}

async function updateStats(opinion,added){
    return await QueryWriteManager.updateStats(opinion,added)
}

module.exports={createQuery,viewQuery,addResponseToQuery,updateStats,listQueries}