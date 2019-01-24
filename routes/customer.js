const express = require('express');
const router =express.Router();
const Customer=require('../modules/customer');

router.route('/get').get((req, res) => {
    Customer.find((err, customer) => {
        if (err)
            console.log(err);
        else
            res.json(customer);
    });
});

router.route('/get/:id').get((req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (err)
            console.log(err);
        else
            res.json(customer);
    });
});


router.post('/add',function(req,res){
        let  customer = new Customer(req.body);
        customer.save()
            .then(issue => {
                res.status(200).json({'issue': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record');
            });
});


router.route('/delete/:id').get((req, res) => {
    Customer.findByIdAndRemove({_id: req.params.id}, (err, customer) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})


router.route('/update/:id').post((req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
        if (!customer)
            return next(new Error('Could not load document'));
        else {
            customer.cId = req.body.cId;
            customer.cFirstName = req.body.cFirstName;
            customer.cLastName = req.body.cLastName;
            customer.cEmail = req.body.cEmail;
            customer.contactno = req.body.contactno;
            customer.save().then(order => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

module.exports =router;