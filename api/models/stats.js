const mongoose = require('mongoose');
//var idvalidator = require('mongoose-id-validator');

const statsSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    //query props
    viewCount:{
        type:Number,
        default:0
    },
    responseCount:{
        type:Number,
        default:0
    },
    followCount:{
        type:Number,
        default:0
    },
    //query and response props
    upVoteCount:{
        type:Number,
        default:0
    },
    downVoteCount:{
        type:Number,
        default:0
    },
    spamReportCount:{
        type:Number,
        default:0
    },
    score:{
        type:Number,
        default:0
    }
});

//statsSchema.plugin(idvalidator)

module.exports = statsSchema;