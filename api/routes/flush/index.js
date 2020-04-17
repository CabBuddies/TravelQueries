let router = require('express').Router();

const CommentManager = require('../../manager/comment/comment-manager')
const OpinionManager = require('../../manager/opinion/opinion-manager')
const QueryManager = require('../../manager/query/query-manager')
const ResponseManager = require('../../manager/response/response-manager')
const TagManager = require('../../manager/tag-manager')
const UserManager = require('../../manager/user-manager')

router.get('/',authToken.authenticateToken, async (req,res)=>{
    
    await UserManager.flushDatabase();
    await TagManager.flushDatabase();
    await ResponseManager.flushDatabase();
    await QueryManager.flushDatabase();
    await OpinionManager.flushDatabase();
    await CommentManager.flushDatabase();

    res.send({success:'OK'})

})

module.exports = router