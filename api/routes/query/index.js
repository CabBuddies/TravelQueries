let router = require('express').Router();
const authToken = require('api-library-user-management/utils/auth-token');
const QueryManager = require('../../manager/query-manager');

router.post('/create', authToken.authenticateToken ,async (req,res)=>{
    const { title, body, tags } = req.body;
    console.log(req.body)
    const user = req.val
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

    console.log(query)

    res.send(query)
})

router.get('/list', async (req,res)=>{
    res.send(await QueryManager.listQueries())
})

router.get('/read', async (req,res)=>{
    const { queryId } = req.query;
    console.log('/query/read called')
    let query = await QueryManager.viewQuery(queryId)
    
    console.log('>.........')
    console.log(query.responses[0].body)
    console.log('>.........')
    res.send(query)
})


module.exports = router