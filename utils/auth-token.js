const restClient = require('./rest-client');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)

    req.val = await restClient.validateJwt(authHeader)
    console.log('printing user...')
    console.log(req.val)
    console.log('...')
    if(req.val==null)
        return res.sendStatus(401)
    next()
}

module.exports={authenticateToken}
