let router = require('express').Router();
const authToken = require('api-library-user-management/utils/auth-token');
const OpinionManager = require('../../manager/opinion/opinion-manager');

router.post('/create', authToken.authenticateToken ,async (req,res)=>{
    const { body,query,response,opinionType } = req.body;
    console.log(req.body)
    const user = req.val

    const opinion = await OpinionManager.saveOpinion({
        body,
        query,
        response,
        opinionType,
        user
    })

    console.log(opinion)

    res.send(opinion)
})

module.exports = router