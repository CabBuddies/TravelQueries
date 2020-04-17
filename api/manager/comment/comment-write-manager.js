const mongoose = require('mongoose');

const Comment = require('../../models/comment');

const UserManager = require('../user-manager');

async function createComment(comment){
    //get or create user associated with comment
    comment.user = await UserManager.findOrCreateUserByJwt(comment.user);
    //create response
    comment = await Comment.create(comment).catch(err=>console.log(err))
    //return null if comment is null
    if(comment==null)
        return null
    //return comment
    return comment
}

async function flushDatabase(){
    if(require('../../utils/debug').canFlushDatabases())
        await Comment.deleteMany({})
}

module.exports={createComment,flushDatabase}