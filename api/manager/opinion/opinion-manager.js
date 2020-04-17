const OpinionReadManager = require('./opinion-read-manager');

const OpinionWriteManager = require('./opinion-write-manager');

async function saveOpinion(opinion){
    return await OpinionWriteManager.saveOpinion(opinion);
}

async function revertOpinion(opinion){
    return await OpinionWriteManager.revertOpinion(opinion);
}

async function flushDatabase(){
    await OpinionWriteManager.flushDatabase();
}

module.exports={saveOpinion,revertOpinion,flushDatabase}