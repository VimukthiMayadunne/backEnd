const express = require('express');
const router =  express.Router();
const Item =    require('../modules/item');
const FeedBack = require('../modules/feedback')
const Dates =require('../modules/dates');

router.route('/get').get((req, res) => {
    Item.find((err, item) => {
        if (err)
            console.log(err);
        else
            res.json(item);
    });
});

router.route('/getf').get((req, res) => {
    FeedBack.find((err, item) => {
        if (err)
            console.log(err);
        else
            res.json(item);
    });
});
router.route('/getfb').post((req, res) => {
    console.log("DAsdasd");
    let details=new Dates(req.body)
    console.log(details);
    FeedBack.findOne({
        time: {
            $gte: details.oDate,
            $lt:  details.nDate
        }}).exec(function(err,order)
    {
        console.log("order Details",order);
        if (err)
            console.log(err);
        else{
            console.log(order);
            res.json(order);}
    });
});

router.route('/get/:id').get((req, res) => {
    Item.findById(req.params.id, (err, item) => {

        if (err)
            console.log(err);
        else
            res.json(item);
    });
});


router.post('/add',function(req,res){
        let  item = new Item(req.body);
        item.save()
            .then(issue => {
                res.status(200).json({'issue': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record');
            });
});


router.route('/delete/:id').get((req, res) => {
    Item.findByIdAndRemove({_id: req.params.id}, (err, item) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})


router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.id, (err, item) => {
        if (!item)
            return next(new Error('Could not load document'));
        else {
            item.iId=req.body.iId;
            item.iName = req.body.iName;
            item.sLHours = req.body.sLHours;
            item.sMHours = req.body.sMHours;
            item.save().then(order => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});


module.exports =router;