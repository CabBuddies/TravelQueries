const Query = require('../../models/query');

const QueryWriteManager = require('./query-write-manager');
const ResponseReadManager = require('../response/response-read-manager');
const CommentReadManager = require('../comment/comment-read-manager');
const OpinionReadManager = require('../opinion/opinion-read-manager');

async function listQueries(){
    return await Query.find({active:true}).lean()
}

async function viewQuery(queryId,user){
    
    let query = await Query.findById(queryId).lean()
    
    query.responses = await ResponseReadManager.viewResponses(queryId)

    query.comments = await CommentReadManager.getComments({query:queryId})

    if(user)
    query.opinions = await OpinionReadManager.readOpinions({query:queryId,user:user._id})

    //StatsManager.updateViews(query.stats)

    QueryWriteManager.updateViews(queryId)

    return query
}

module.exports={viewQuery,listQueries}