const mongoose = require('mongoose');

const CommentReadManager = require('./comment-read-manager')
const CommentWriteManager = require('./comment-write-manager')

async function createComment(comment){
    return await CommentWriteManager.createComment(comment)
}

async function getComments(comment){
    return await CommentReadManager.getComments(comment)
}

async function flushDatabase(){
    await CommentWriteManager.flushDatabase();
}

module.exports={createComment,getComments,flushDatabase}