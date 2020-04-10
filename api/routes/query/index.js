let router = require('express').Router();
const authToken = require('api-library-user-management/utils/auth-token');
const QueryManager = require('../../manager/query/query-manager');

router.post('/create', authToken.authenticateToken ,async (req,res)=>{
    const { title, body, tags } = req.body;
    console.log('==========>QueryRouterReqBody')
    console.log(req.body)
    const user = req.val
    console.log('==========>QueryRouterUser')
    console.log(user)
    if(user == null){
        res.send({error:'No User'})
        return
    }

    const query = await QueryManager.createQuery({
        title,
        body,
        tags,
        user
    });

    console.log('==========>QueryRouterQuery')
    console.log(query)

    res.send(query)
})

router.get('/list', async (req,res)=>{
    res.send(await QueryManager.listQueries())
})

router.get('/read', async (req,res)=>{
    const { queryId } = req.query;
    console.log('/query/read called '+queryId)

    let query = await QueryManager.viewQuery(queryId)
    
    // console.log('>.........')
    // console.log(query.responses[0].body)
    // console.log('>.........')
    res.send(query)
})


router.put('/update', authToken.authenticateToken , QueryManager.isCreator , async (req,res)=>{
    const { _id, title, body, tags } = req.body;
    console.log('==========>QueryRouterReqBody')
    console.log(req.body)
    const user = req.val
    console.log('==========>QueryRouterUser')
    console.log(user)
    if(user == null){
        res.send({error:'No User'})
        return
    }

    const query = await QueryManager.updateQuery({
        _id,
        title,
        body,
        tags
    });

    console.log('==========>QueryRouterQuery')
    console.log(query)

    res.send(query)
})

router.put('/inactivate', authToken.authenticateToken , QueryManager.isCreator , async (req,res)=>{
    const { _id } = req.body;
    console.log('==========>QueryRouterReqBody')
    console.log(req.body)
    const user = req.val
    console.log('==========>QueryRouterUser')
    console.log(user)
    if(user == null){
        res.send({error:'No User'})
        return
    }

    const query = await QueryManager.activateQuery({
        _id
    },false);

    console.log('==========>QueryRouterQuery')
    console.log(query)

    res.send(query)
})

router.put('/activate', authToken.authenticateToken , QueryManager.isCreator , async (req,res)=>{
    const { _id } = req.body;
    console.log('==========>QueryRouterReqBody')
    console.log(req.body)
    const user = req.val
    console.log('==========>QueryRouterUser')
    console.log(user)
    if(user == null){
        res.send({error:'No User'})
        return
    }

    const query = await QueryManager.activateQuery({
        _id
    },true);

    console.log('==========>QueryRouterQuery')
    console.log(query)

    res.send(query)
})

module.exports = router