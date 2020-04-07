const mongoose = require('mongoose');

const Response = require('../../models/response');

const ResponseReadManager = require('./response-read-manager')
const ResponseWriteManager = require('./response-write-manager')

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

module.exports={createResponse,viewResponse,viewResponses,updateStats}