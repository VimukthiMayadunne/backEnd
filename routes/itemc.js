const express = require('express');
const router =express.Router();
const Itemc=require('../modules/itemC');
const Manual=require('../modules/manual');
const Alert=require('../modules/alert');
const Order=require('../modules/order')

router.route('/get').get((req, res) => {
    Itemc.find((err, itemC) => {
        if (err)
            console.log(err);
        else
            res.json(itemC);
    });
});

router.route('/getal').get((req, res) => {
    Alert.find((err, itemC) => {
        if (err)
            console.log(err);
        else
            res.json(itemC);
    });
});
router.get('/stopPro').get((req,res)=>{
    let stat =false;
    Manual.findOne({}).sort('-timeStamp').limit(1).exec(function(err, manual) {
        if (err)
            console.log(err);
        else{
            manual.stat = stat;
            manual.save()
                .then(issue => {
                    res.status(200).json({'Productio': 'Terminated Succefull'});
                })
                .catch(err => {
                    res.status(400).send('Failed to stop the production');
            });             
        }
        
    });
});

router.post('/add',function(req,res){
            console.log("Awa");
            let acount = req.body.ict;
            let device = req.body.dId;
            var standrd ;
            var newCount;    
            let  itemc = new Itemc(req.body);                   
            Manual.findOne({}).sort('-timeStamp').limit(1).exec(function(err, manual) {
                console.log(manual);
                let oId=manual.oId;
                let iId=manual.iId;
                let cId=manual.cid;
                //let dId=manual.dId;
                if (err)
                    return;
                else
                {
                itemc.save()
                    .then(issue => {
                        res.status(200).json({'issue': 'Added successfully'});
                    })
                    .catch(err => {
                        res.status(400).send('Failed to create new record');
                    });
                    Order.findOne({'oId':oId}).exec(function(err,order)
                    {
                        if(err)
                            return;
                        if(order.qntity<order.complete+acount)
                        {
                            order.complete = newCount;
                            order.stat= "Order_Completed";
                            order.save();
                            return;
                        }
                        else
                        {
                            standrd=manual.aRate;
                            newCount=order.complete+acount;
                            var vari=standrd-acount;
                            console.log("order Awa");
                            console.log("Standard:",standrd);
                            console.log("Count Recived:",acount);
                            if( acount< standrd)
                            {
                                let  alert = new Alert({oid:oId ,iId:iId , cId:cId , variance:vari});
                                alert.save();
                                console.log("alert awa aawaw  assadsadsadsdsadsadsadadsadsafedfsa");



                            }
                            order.complete = newCount;
                            order.save();
                            console.log("WADA WADADADSA");
                        }
                    });
                }                       
            });
        });

router.route('/delete/:id').get((req, res) => {
    Itemc.findByIdAndRemove(req.params.id, (err, order) => {
        if (err)
            res.json(err);
        else
            res.json('Remove successfully');
    });
});

module.exports =router;