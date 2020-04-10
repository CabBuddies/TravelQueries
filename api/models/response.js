const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const statsSchema = require('./stats');

const responseSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    body:{
        type:String,
        minLength:1,
        maxLength:500,
        required: 'Body is required'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: 'User is required'
    },
    query:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Query',
        required: 'Query is required'
    },
    stats:{
        type:statsSchema,
        default: statsSchema
    },
    hidden:{
        type:Boolean,
        default:false
    },
    postedOn:{ 
        type: Date, 
        default: Date.now 
    },
    lastUpdatedOn:{ 
        type: Date, 
        default: Date.now 
    },
    accepted:{
        type:Boolean,
        default:false
    }
});

responseSchema.plugin(idvalidator)

responseSchema.index({ query: 1, hidden: 1, accepted: 1, 'stats.score': 1,'stats.viewCount': 1 })

var autoPopulate = function(next) {
    //this.populate('stats');
    this.populate('user');
    next();
};
  
responseSchema.
    pre('findOne', autoPopulate).
    pre('find', autoPopulate);

module.exports = mongoose.model('Response',responseSchema);