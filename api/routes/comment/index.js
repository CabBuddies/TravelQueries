let router = require('express').Router();
const authToken = require('../../../utils/auth-token');
const CommentManager = require('../../manager/comment-manager');

router.post('/create', authToken.authenticateToken ,async (req,res)=>{
    const { message,query,response/*,comment*/ } = req.body;
    console.log(req.body)
    const user = req.val
    
    const comment = await CommentManager.createComment({
        message,
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