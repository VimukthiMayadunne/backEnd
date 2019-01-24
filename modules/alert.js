const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let AlertSchema = new Schema({
    oid:{
        type: String,
    },
    iId: {
        type: String,
        //required:[true,"Required"]
    },
    cId: {
        type: String,
        //required:[true,"Required"]
    },
    variance: {
        type: Number,
        //required:[true,"Required"]
    },
    timeStamp: {
        type: Date,
        default:Date.now, 
    }
});

const Alert =mongoose.model('alert',AlertSchema);
module.exports = Alert;