const mongoose = require('mongoose');

const Response = require('../../models/response');

const ResponseReadManager = require('./response-read-manager')
const ResponseWriteManager = require('./response-write-manager')
const ResponseAccessManager = require('./response-access-manager')

async function createResponse(response){
    return await ResponseWriteManager.createResponse(response)
}

async function viewResponse(responseId){
    return await ResponseReadManager.viewResponse(responseId)
}
async function viewResponses(queryId){
    return await ResponseReadManager.viewResponses(queryId)
}

async function updateStats(opinion,added){
    await ResponseWriteManager.updateStats(opinion,added)
}

async function updateResponse(response){
    return await ResponseWriteManager.updateResponse(response)
}

async function isCreator(req,res,next){
    await ResponseAccessManager.isCreator(req,res,next)
}

async function hiddenResponse(response,hidden){
    return await ResponseWriteManager.hiddenResponse(response,hidden)
}

async function flushDatabase(){
    await ResponseWriteManager.flushDatabase();
}

module.exports={createResponse,viewResponse,viewResponses,updateStats,isCreator,updateResponse,hiddenResponse,flushDatabase}