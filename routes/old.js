const express = require('express');
const router =express.Router();


router.get('/ninjas',function(req,res){
    res.send({type:'GET'});
});

router.post('/ninjas',function(req,res){
    res.send({type:'Post'});
});

router.put('/ninjas/:id',function(req,res){
    res.send({type:'Update'});
});

router.delete('/ninjas/:id',function(req,res){
    res.send({type:'Delete'});
});

module.exports =router;