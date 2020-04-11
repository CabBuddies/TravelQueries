const Response = require('../../models/response');

async function isCreator(req, res, next) {
    let user = req.val
    let responseId = req.body._id    

    if( user === null || user === undefined )
        return res.sendStatus(403)
    if( responseId === null || responseId === undefined )
        return res.sendStatus(404)

    let response = await Response.findOne({_id:responseId,user:user._id})

    if( response === null || response === undefined)
        return res.sendStatus(403)

    //req.valQ = query

    next()
}

module.exports={isCreator}