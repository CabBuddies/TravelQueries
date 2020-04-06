const mongoose = require('mongoose');

const Query = require('../models/query');

const UserManager = require('./user-manager');
const ResponseManager = require('./response-manager');
const TagManager = require('./tag-manager');
const CommentManager = require('./comment-manager');

async function createQuery(query){
    //get or create user associated with query
    query.user = await UserManager.findOrCreateUserByJwt(query.user);

    //create empty stats
    //query.stats = await StatsManager.newStats()
    //create query
    query = await Query.create(query).catch(err=>console.log(err))
    //check if query creation returned null
    if(query === null)
        return null
    //add query to tags
    await TagManager.addQueryToTags(query)
    //return query to controller
    return query
}

async function addResponseToQuery(response){
    await Query.updateOne({_id:response.query._id},{$inc:{'stats.responseCount':1}})
}

async function listQueries(){
    return await Query.find({}).lean()
}

async function viewQuery(queryId){
    
    let query = await Query.findById(queryId).lean()

    query.responses = await ResponseManager.viewResponses(queryId)

    query.comments = await CommentManager.getComments({query:queryId})

    for (let index = 0; index < query.responses.length; index++) {
        query.responses[index].comments = await CommentManager.getComments({response:query.responses[index]._id})
    }

    StatsManager.updateViews(query.stats)

    return query
}

async function updateStats(opinion,added){
    console.log(opinion.query+'needs stats update')
}

module.exports={createQuery,viewQuery,addResponseToQuery,updateStats,listQueries}