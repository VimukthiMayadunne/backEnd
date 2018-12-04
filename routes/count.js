const express = require('express');
const router =express.Router();
const Count=require('../modules/count');


router.route('/get').get((req, res) => {
    Count.find((err, count) => {
        if (err)
            console.log(err);
        else
            res.json(count);
    });
});

router.route('/get/:id').get((req, res) => {
    Count.findById(req.params.id, (err, count) => {
        if (err)
            console.log(err);
        else
            res.json(count);
    });
});

router.post('/add',function(req,res){
    let  count = new Count(req.body);
    count.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});


module.exports =router;