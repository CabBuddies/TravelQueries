const Query = require('../../models/query');

async function isCreator(req, res, next) {
    let user = req.val
    let queryId = req.body._id    

    if( user === null || user === undefined )
        return res.sendStatus(403)
    if( queryId === null || queryId === undefined )
        return res.sendStatus(404)

    let query = await Query.findOne({_id:queryId,user:user._id})

    if( query === null || query === undefined)
        return res.sendStatus(403)

    //req.valQ = query

    next()
}

module.exports={isCreator}