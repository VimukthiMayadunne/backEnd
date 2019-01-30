const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let AutoSchema = new Schema({
    iId:{
        type: String,
    },
    sDate: {
        type: Date,
        //required:[true,"Required"]
    },
    fDate: {
        type: Date,
        //required:[true,"Required"]
    },
    noDate:{
        type: Number
    },
    avgEmp: {
        type: Number,
    },
    mHours: {
        type: Number
    },
    wh:{
        type:Number,
        default:8,
    }
});

const Auto =mongoose.model('auto',AutoSchema);
module.exports = Auto;