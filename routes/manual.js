const express = require('express');
const router = express.Router();
const Manual=require('../modules/manual');

router.route('/get').get((req, res) => {
    Manual.findOne({}).sort('-timeStamp').limit(1).exec(function(err, manual) {
        if (err)
            console.log(err);
        else
            res.json(manual);
        
    });
});

router.route('/getstat').get((req, res) => {
    Manual.findOne({}).sort('-timeStamp').limit(1).exec(function(err, manual) {
        if (err)
            console.log(err);
        else
            res.json(false);
        
    });
});



router.post('/add',function(req,res){
    let  manual = new Manual(req.body);
    console.log(manual);
    manual.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});



router.route('/update/:id').post((req, res) => {
    Manual.findById({_id:req.params.id}, (err, manual) => {
        if (!order)
            return next(new Error('Could not load document'));
        else {
            manual.oId = req.body.oId;
            manual.stat = req.body.stat;
            manual.save().then(order => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

module.exports =router;