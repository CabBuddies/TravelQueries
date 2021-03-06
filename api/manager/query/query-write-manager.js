const mongoose = require('mongoose');

const Query = require('../../models/query');

const UserManager = require('../user-manager');
const TagManager = require('../tag-manager');

async function createQuery(query){
    //get or create user associated with query
    query.user = await UserManager.findOrCreateUserByJwt(query.user);

    //query = packQueryForCreation(query)

    query.tags.map(tag => tag.trim())

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

async function updateStats(opinion,added){
    console.log(opinion.query+'needs stats update')
    let inc = added ? 1 : -1;
    let prop = {}
    switch(opinion.opinionType){
        case "Follow":prop={'stats.followCount':inc};break;
        case "UpVote":prop={'stats.upVoteCount':inc};break;
        case "DownVote":prop={'stats.downVoteCount':inc};break;
        case "SpamReport":prop={'stats.spamReportCount':inc};break;
        default : return;
    }
    await Query.updateOne({_id:opinion.query},{$inc:prop})
}

async function updateViews(queryId){
    await Query.updateOne({_id:queryId},{$inc:{'stats.viewCount':1}})
}

async function updateQuery(query){
    //query = packQueryForUpdation(query)
    query.lastUpdatedOn = new Date();
    query.tags.map(tag => tag.trim());
    
    //add query to tags
    await TagManager.adjustQueryToTags(await Query.findById(query._id).lean(),query.tags)

    return await Query.findOneAndUpdate({_id:query._id},{$set:query})
}

async function activateQuery(query,active){
    //query = packQueryForUpdation(query)
    query.lastUpdatedOn = new Date();
    query.active = active
    return await Query.findOneAndUpdate({_id:query._id},{$set:query})
}
// function packQueryForCreation(query){
//     const {title,body,tags,user} = query
//     return {title,body,tags,user}
// }

// function packQueryForUpdation(query){
//     const {_id,title,body,tags,user} = query
//     return {_id,title,body,tags,user}
// }

async function flushDatabase(){
    if(require('../../utils/debug').canFlushDatabases())
        await Query.deleteMany({})
}

module.exports={createQuery,updateViews,addResponseToQuery,updateStats,updateQuery,activateQuery,flushDatabase}