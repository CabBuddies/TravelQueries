let router = require('express').Router();
const authToken = require('api-library-user-management/utils/auth-token');
const CommentManager = require('../../manager/comment/comment-manager');

router.post('/create', authToken.authenticateToken ,async (req,res)=>{
    const { body,query,response/*,comment*/ } = req.body;
    console.log(req.body)
    const user = req.val
    
    const comment = await CommentManager.createComment({
        body,
        query,
        response,
        //comment,
        user
    });

    console.log(comment)

    res.send(comment)
})

// router.get('/list', async (req,res)=>{

//     res.send(await ResponseManager.viewResponses(req.body.queryId))
// })

// router.get('/read', async (req,res)=>{
//     res.send(await ResponseManager.viewResponse(req.body.responseId))
// })


module.exports = router