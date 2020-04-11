let router = require('express').Router();
const authToken = require('api-library-user-management/utils/auth-token');
const ResponseManager = require('../../manager/response/response-manager');

router.post('/create', authToken.authenticateToken ,async (req,res)=>{
    const { body,query } = req.body;
    console.log('==========>ResponseRouterReqBody')
    console.log(req.body)
    const user = req.val
    console.log('==========>ResponseRouterUser')
    console.log(user)
    if(user == null){
        res.send({error:'No User'})
        return
    }
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

router.put('/update', authToken.authenticateToken , ResponseManager.isCreator ,async (req,res)=>{
    const { _id, body } = req.body;
    console.log('==========>ResponseRouterReqBody')
    console.log(req.body)
    const user = req.val
    console.log('==========>ResponseRouterUser')
    console.log(user)
    if(user == null){
        res.send({error:'No User'})
        return
    }
    const response = await ResponseManager.updateResponse({
        _id,
        body
    });

    console.log(response)

    res.send(response)
})

router.put('/hide', authToken.authenticateToken , ResponseManager.isCreator , async (req,res)=>{
    const { _id , hidden } = req.body;
    console.log('==========>QueryRouterReqBody')
    console.log(req.body)
    const user = req.val
    console.log('==========>QueryRouterUser')
    console.log(user)
    if(user == null){
        res.send({error:'No User'})
        return
    }

    const response = await ResponseManager.hiddenResponse({
        _id
    },hidden);

    console.log('==========>QueryRouterQuery')
    console.log(response)

    res.send(response)
})

module.exports = router