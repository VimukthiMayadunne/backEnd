const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let FeedBackSchema = new Schema({
    date:{
        type: Date,
        default:Date.now()
    },
    iId: {
        type: String,
        //required:[true,"Required"]
    },
    stat: {
        type: String,
    },
    type: {
        type: String,
        //required:[true,"Required"]
    },
    des: {
        type: String,
        //required:[true,"Required"]
    }
});

const FeedBack =mongoose.model('feedback',FeedBackSchema);
module.exports = FeedBack;