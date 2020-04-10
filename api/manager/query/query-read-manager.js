const Query = require('../../models/query');

const QueryWriteManager = require('./query-write-manager');
const ResponseReadManager = require('../response/response-read-manager');
const CommentReadManager = require('../comment/comment-read-manager');


async function listQueries(){
    return await Query.find({active:true}).lean()
}

async function viewQuery(queryId){
    
    let query = await Query.findById(queryId).lean()
    
    query.responses = await ResponseReadManager.viewResponses(queryId)

    query.comments = await CommentReadManager.getComments({query:queryId})

    for (let index = 0; index < query.responses.length; index++) {
        query.responses[index].comments = await CommentReadManager.getComments({response:query.responses[index]._id})
    }

    //StatsManager.updateViews(query.stats)

    QueryWriteManager.updateViews(queryId)

    return query
}

module.exports={viewQuery,listQueries}