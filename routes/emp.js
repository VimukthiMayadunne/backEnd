const express = require('express');
const router =express.Router();
const Emp = require('../modules/emp');

router.route('/get').get((req, res) => {
    Emp.find((err, emp) => {
        if (err)
            console.log(err);
        else
            res.json(emp);
    });
});

router.route('/get/:id').get((req, res) => {
    Emp.findById(req.params.id, (err, emp) => {
        if (err)
            console.log(err);
        else
            res.json(emp);
    });
});


router.post('/add',function(req,res){
        let  emp = new Emp(req.body);
        emp.save()
            .then(issue => {
                res.status(200).json({'issue': 'Added successfully'});
            })
            .catch(err => {
                res.status(400).send('Failed to create new record');
            });
});


router.route('/delete/:id').get((req, res) => {
    Emp.findByIdAndRemove({_id: req.params.id}, (err, emp) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    })
})


router.route('update/:id').post((req, res) => {
    Emp.findById(req.params.id, (err, emp) => {
        if (!emp)
            return next(new Error('Could not load document'));
        else {
            emp.eid = req.body.eid;
            emp.eFirstName = req.body.eFirstName;
            emp.eLastName = req.body.eLastName;
            emp.eType = req.body.eType;
            emp.eEmail =req.body.eEmail;
            emp.contactNo=req.body.contactNo;
            emp.save().then(order => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});
module.exports =router;