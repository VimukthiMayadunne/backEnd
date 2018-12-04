const express = require('express');
const router =express.Router();
const Order=require('../modules/order');

router.route('/get').get((req, res) => {
    Order.find((err, ninja) => {
        if (err)
            console.log(err);
        else
            res.json(ninja);
    });
});

router.route('/get/:id').get((req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err)
            console.log(err);
        else
            res.json(order);
    });
});


router.post('/add',function(req,res){
        let  order = new Order(req.body);
        order.save()
            .then(issue => {
                res.status(200).json({'issue': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record');
            });
});


router.route('/delete/:id').get((req, res) => {
    Order.findByIdAndRemove({_id: req.params.id}, (err, order) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})


router.route('update/:id').post((req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (!order)
            return next(new Error('Could not load document'));
        else {
            order.itemname = req.body.itemname;
            order.dueDate = req.body.dueDate;
            order.qntity = req.body.qntity;
            order.stat = req.body.stat;
            order.save().then(order => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

module.exports =router;