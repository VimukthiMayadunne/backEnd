const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let CountSchema = new Schema({
    iCount: {
        type: Number,
        required:[true,"Required"]
    },
    TimeStamp: {
        type: Number,
    }
});

const Count =mongoose.model('count',CountSchema);
module.exports = Count;