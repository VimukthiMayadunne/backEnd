const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let FeedBackSchema = new Schema({
    empId:{
        type: String,
    },
    iId: {
        type: String,
        //required:[true,"Required"]
    },
    type: {
        type: String,
        //required:[true,"Required"]
    },
    stat: {
        type: String,
    },
    time: {
        type: Date,
        default:Date.now, 
    }
});

const FeedBack =mongoose.model('feedback',FeedBackSchema);
module.exports = FeedBack;