const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let ManualSchema = new Schema({
    oId: {
        type: String,
        //required:[true,"Required"]
    },
    iId: {
        type: String,
        //required:[true,"Required"]
    },
    cId: {
        type: String,
        //required:[true,"Required"]
    },
    dId:{
        type: String,
    },
    aRate:{
        type:Number,
        //required:[true,"Required"]
    },
    timeStamp: {
        type: Date,
        default:Date.now 
    },
    stat:{
        type:Boolean,
        default:true
    }
});

const Manual =mongoose.model('manual',ManualSchema);

Manual.getRate =function(err, manual) {
    Manual.findOne({}).sort('-timeStamp').limit(1).exec(function(err, manual) {
        if (err)
            console.log(err);
        else
            return res.aRate;
  });
};
module.exports = Manual;