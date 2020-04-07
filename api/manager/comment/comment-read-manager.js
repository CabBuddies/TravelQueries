const mongoose = require('mongoose');

const Comment = require('../../models/comment');

async function getComments(comment){
    return await Comment.find(comment)
}

module.exports={getComments}