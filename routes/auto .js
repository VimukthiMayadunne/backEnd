const express = require('express');
const router =express.Router();
const Order=require('../modules/order');
const Auto =require('../modules/auto');
const Item =require('../modules/item');
const Std =require('../modules/std');

function workingdays(date1,date2,nonwork){
    var diff =Math.floor((date1 - date2) / (1000*60*60*24))-nonwork;
    return diff;
}
function maxPerLH(slhours,workingdays,workinghours,nfemp) {
    var maxl=workingdays*workinghours*nfemp/slhours;
    var aRate=maxl/workingdays/workinghours;
    return Math.floor(aRate);
}
function maxPerMH(smhours,workingdays,workinghours,mcph) {
    var maxh=workingdays*workinghours*mcph/smhours;
    var aRate=maxh/workingdays/workinghours;
    return Math.floor(aRate);
}
function getRate(oderqty,workingdays,workinghours){
    var rate=oderqty/workingdays/workinghours;
    return Math.floor(rate); 
}


router.route('/get').get((req, res) => {
    Std.findOne((err, itemC) => {
        if (err)
            console.log(err);
        else
            res.json(itemC);
    });
});


router.route('/getone').get((req, res) => {
    Std.findOne((err, itemC) => {
        if (err)
            console.log(err);
        else
            res.json(itemC);
    });
});

router.post('/add',function(req,res){
    console.log("Request Body",req.body);
    let auto = new Auto(req.body);
    console.log("Standard:",auto);
    res.status(200).json({'FeedBack': 'Added successfully'});
    let wd   = workingdays(auto.fDate,auto.sDate,auto.noDate);
    var idt,count,bneck,sRate,rRate;
    var value=0;
    Item.findOne({'iId':'S001XLR'}).exec(function(err,order)
    {
    idt = new Item(order);
    Order.find({
            dueDate: {
                $gte: auto.sDate,
                $lt:  auto.fDate
            }}).exec(function(err,od){
                od.forEach(element => {
                    count=element.qntity
                    value=value+count;
                });
    let maxL=maxPerLH(idt.sLHours,wd,auto.wh,auto.avgEmp);
    let maxM=maxPerMH(idt.sMHours,wd,auto.wh,auto.avgEmp);
    let rRate=getRate(count,wd,auto.wh);
    if(maxL < maxM &&  maxL < rRate){
        bneck="Labhour Hours";
        sRate=maxL;
    }
    else if( maxM < rRate){
        bneck="Mashine Hours";
        sRate=maxL;
    }
    else{
        bneck="Prodcution Units"
        if( maxM < maxL)
            sRate=maxM
        else
            sRate=maxM
    }
   let newstd = new Std({iId:auto.iId ,rRate:rRate,sRate:sRate,bNeck:bneck,sDate:auto.sDate,fDate:auto.fDate});
   console.log("Final:",newstd);
   newstd.save();
});
});
});

module.exports =router;