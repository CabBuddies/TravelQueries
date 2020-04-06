const mongoose = require('mongoose');

const User = require('../models/user');

async function findOrCreateUserByJwt(user){
    //trying to find tq_user based on userId in jwt
    
    try {
        console.log('attemting to find user')
        let resuser = await User.findById(user._id)
        console.log(resuser.email)
        return resuser
    } catch (error) {
        console.log(error)
        console.log('attemting to create user')
        user = JSON.parse(JSON.stringify(user))
        // user.id = new mongoose.Types.ObjectId(user._id)
        // delete user['_id']
        console.log(user)
        return await User.create(user).catch(err=>console.log(err));
    }
    
}

module.exports={findOrCreateUserByJwt}