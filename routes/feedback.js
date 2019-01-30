const express = require('express');
const router =express.Router();
const FeedBack = require('../modules/feedback');

router.route('/get').get((req, res) => {
    FeedBack.find((err, feed) => {
        if (err)
            console.log(err);
        else
            res.json(feed);
    });
});

router.post('/add',function(req,res){
    let  feedback = new FeedBack(req.body);
    feedback.save()
        .then(issue => {
            res.status(200).json({'FeedBack': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/getbyDate').get((req, res) => {
    FeedBack.find({'time': req.body.time}).exec((err, feed) => {
        if (err)
            console.log(err);
        else
            res.json(feed);
    });
});

module.exports =router;