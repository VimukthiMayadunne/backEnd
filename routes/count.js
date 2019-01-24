/*const express = require('express');
const router =express.Router();
const CountR=require('../modules/count');
//const Manual=require('../modules/manual');
//const Alert =require('../modules/alert');


router.route('/get').get((req, res) => {
    CountR.find((err, count) => {
        if (err)
            console.log(err);
        else
            res.json(count);
    });
});

router.route('/get/:id').get((req, res) => {
    CountR.findById(req.params.id, (err, count) => {
        if (err)
            console.log(err);
        else
            res.json(count);
    });
});

router.post('/add',function(req,res){
    let  countR = new CountR(req.body);
    /*let  rate = Manual.getRate();
    let  acount = req.body.iCount;
    if (rate < acount){
        let fig=acount-rate;
        let alert =new Alert({ oId : req.body.oId , alert:fig});
        alert.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });

    }*//*
    countR.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.post('/addd',function(req,res){
    let  countR = new CountR(req.body);
    countR.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});



module.exports =router;
*/