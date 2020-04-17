let router = require('express').Router();
const authToken = require('api-library-user-management/utils/auth-token');
const OpinionManager = require('../../manager/opinion/opinion-manager');

router.post('/create', authToken.authenticateToken ,async (req,res)=>{
    const { body,query,response,opinionType } = req.body;
    console.log(req.body)
    const user = req.val
    let opinion = {
        body,
        query,
        response,
        opinionType,
        user
    };
    
    console.log(opinion)

    opinion = await OpinionManager.saveOpinion(opinion)

    console.log(opinion)

    res.send(opinion)
})

module.exports = router