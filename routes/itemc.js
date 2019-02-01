const express = require('express');
const router =express.Router();
const Itemc=require('../modules/itemC');
const Manual=require('../modules/manual');
const Alert=require('../modules/alert');
const Order=require('../modules/order');

router.route('/formdetails').post((req,res)=>{
    let alert=new Alert(req.body);
    var query;
    if(alert.oid==null && alert.iId==null && alert.variance==null)
        query={}
    else if(alert.oid==null && alert.iId==null)
        query={variance: { $gt:alert.variance }}
    else if(alert.oid==null && alert.variance== null)
        query={'iId':alert.iId}
    else if(alert.iId==null && alert.variance== null)
        query={'oid':alert.oid}
    else if(alert.oid==null)
        query={'iId':alert.iId , 'variance': { $gt:alert.variance  } }
    else if (alert.iId==null)
        query={'oid':alert.oid , 'variance': { $gt:alert.variance  } }
    else 
        query={'iId':alert.iId ,'oid':alert.oid , 'variance': { $gt:alert.variance  } }

    Alert.find(query).exec(function(err, alts) {
            if (err)
                console.log(err);
            else
                res.json(alts);
        });
    })


router.route('/get').get((req, res) => {
    Itemc.find({}).limit(10).exec(function(err,item) {
        if (err)
            console.log(err);
        else
            res.json(item);
    });
});

router.route('/getal').get((req, res) => {
    Alert.find({}).limit(10).exec(function(err,itemc){
        if (err)
            console.log(err);
        else
            res.json(itemc);
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
                let dId=manual.dId;
                if (err)
                    return;
                if (0)
                    return;
                else
                {
                console.log(itemc);
                itemc.save()
                    .then(issue => {
                        res.status(200).json({'issue': 'Added successfully','success':true});
                    })
                    .catch(err => {
                        res.status(200).json({'issue': 'Canonot','success':false});
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