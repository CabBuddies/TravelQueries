const QueryReadManager = require('./query-read-manager');
const QueryWriteManager = require('./query-write-manager');
const QueryAccessManager = require('./query-access-manager');

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

async function updateQuery(query){
    return await QueryWriteManager.updateQuery(query)
}

async function isCreator(req,res,next){
    await QueryAccessManager.isCreator(req,res,next)
}

async function activateQuery(query,active){
    return await QueryWriteManager.activateQuery(query,active)
}

async function flushDatabase(){
    await QueryWriteManager.flushDatabase();
}

module.exports={createQuery,viewQuery,addResponseToQuery,updateStats,listQueries,updateQuery,isCreator,activateQuery,flushDatabase}