const mongoose = require('mongoose');

const Tag = require('../models/tag');

async function addQueryToTags(query){
    for (let index = 0; index < query.tags.length; index++) {
        const tag = query.tags[index];
        try {
            await Tag.update(
                {
                    _id:tag
                },
                {
                    $push:{queries:query},
                    $set:{_id:tag.trim()}
                },
                {
                    upsert:true
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

async function removeQueryFromTags(query){
    for (let index = 0; index < query.tags.length; index++) {
        const tag = query.tags[index];
        try {
            await Tag.findOneAndUpdate(
                {
                    _id:tag
                },
                {
                    $pullAll:{queries:[query._id]}
                },
                { safe: true }
            )
        } catch (error) {
            console.log(error)
        }
    }
}

async function adjustQueryToTags(query,newTags){
    if(arraysEqual(query.tags,newTags))
        return;
    
    const removeTags = query.tags.filter(n => !newTags.includes(n))

    const addTags = newTags.filter(n => !query.tags.includes(n))
    
    query.tags = removeTags

    removeQueryFromTags(query)

    query.tags = addTags

    addQueryToTags(query)

}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

async function flushDatabase(){
    if(require('../utils/debug').canFlushDatabases())
        await Tag.deleteMany({})
}

module.exports={addQueryToTags,adjustQueryToTags,flushDatabase}