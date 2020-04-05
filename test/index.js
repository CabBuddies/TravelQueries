let router = require('express').Router();
var path = require('path')

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/index.html'));
})
router.get('/query/list',(req,res)=>{
    res.sendFile(path.join(__dirname + '/query/list.html'));
})
router.get('/query/create',(req,res)=>{
    res.sendFile(path.join(__dirname + '/query/create.html'));
})
router.get('/query/read',(req,res)=>{
    res.sendFile(path.join(__dirname + '/query/read.html'));
})
router.get('/response/create',(req,res)=>{
    res.sendFile(path.join(__dirname + '/response/create.html'));
})

module.exports = router