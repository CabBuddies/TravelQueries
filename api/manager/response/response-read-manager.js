const mongoose = require('mongoose');

const Response = require('../../models/response');

async function viewResponse(responseId){
    return await Response.findById(responseId)
}
async function viewResponses(queryId){
    return await Response.find({query:queryId,hidden:false}).lean()
}

module.exports={viewResponse,viewResponses}