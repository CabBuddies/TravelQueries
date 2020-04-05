let router = require('express').Router();
const authToken = require('../../../utils/auth-token');
const ResponseManager = require('../../manager/response-manager');

router.post('/create', authToken.authenticateToken ,async (req,res)=>{
    const { body,query } = req.body;
    console.log(req.body)
    const user = req.val
    
    const response = await ResponseManager.createResponse({
        query,
        body,
        user
    });

    console.log(response)

    res.send(response)
})

router.get('/list', async (req,res)=>{
    res.send(await ResponseManager.viewResponses(req.body.queryId))
})

router.get('/read', async (req,res)=>{
    res.send(await ResponseManager.viewResponse(req.body.responseId))
})


module.exports = router