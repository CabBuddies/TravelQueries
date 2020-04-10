const mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');

const userSchema = mongoose.Schema({
    // id: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     auto:false
    // },
    email:{
        type:String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email is required'
    },
    firstName:{
        type:String,
        trim: true,
        required: 'First Name is required'
    },
    lastName:{
        type:String,
        trim: true,
        required: 'Last Name is required'
    },
    phoneNumber:{
        type:String,
        trim: true,
        default:''
    },
    displayPicture:{
        type:String,
        trim: true,
        default:''
    }
});

userSchema.index({email:1},{unique:true})

userSchema.plugin(idvalidator)

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        console.log(error)
        next(new Error('Email already exists.'));
    } else {
        next(error);
    }
});

module.exports = mongoose.model('User',userSchema);