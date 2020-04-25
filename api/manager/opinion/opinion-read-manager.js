const mongoose = require('mongoose');

const Opinion = require('../../models/opinion');

async function readOpinions(example){
    return await Opinion.find(example).lean()
}

module.exports={readOpinions}