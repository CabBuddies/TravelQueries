const mongoose = require('mongoose');
const idvalidator = require('mongoose-id-validator');
const statsSchema = require('./stats');

const querySchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        minLength:5,
        maxLength:140
    },
    body:{
        type:String,
        maxLength:500
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: 'User is required'
    },
    tags:[{
        type:String,
        minLength:2,
        maxLength:64
    }],
    stats:{
        type:statsSchema,
        default: statsSchema
    },
    postedOn:{ 
        type: Date, 
        default: Date.now 
    },
    lastUpdatedOn:{ 
        type: Date, 
        default: Date.now 
    },
    active:{
        type:Boolean,
        default:true
    }
});

querySchema.plugin(idvalidator)

querySchema.index({ active:1, 'stats.score': 1,'stats.viewCount': 1 })
querySchema.index({ active:1, 'postedOn': 1,'stats.score': 1 })

var autoPopulate = function(next) {
    console.log('populating')
    this.populate('stats');
    this.populate('user');
    next();
};
  
querySchema.
    pre('findOne', autoPopulate).
    pre('find', autoPopulate);

module.exports = mongoose.model('Query',querySchema);