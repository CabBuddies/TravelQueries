const mongoose = require('mongoose');

const Response = require('../../models/response');

const OpinionReadManager = require('../opinion/opinion-read-manager')

const CommentReadManager = require('../comment/comment-read-manager')

async function viewResponse(responseId){
    return await Response.findById(responseId)
}
async function viewResponses(queryId,user){
    let responses = await Response.find({query:queryId,hidden:false}).lean()

    if(user)
    for (let index = 0; index < responses.length; index++) {
        responses[index].opinions = await OpinionReadManager.readOpinions({response:responses[index]._id,user:user._id})
    }

    for (let index = 0; index < responses.length; index++) {
        responses[index].comments = await CommentReadManager.getComments({response:responses[index]._id})
    }

    return responses
}

module.exports={viewResponse,viewResponses}