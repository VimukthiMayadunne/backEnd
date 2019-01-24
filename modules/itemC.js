const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let ItemcSchema = new Schema({
    ict: {
        type: Number,
        default:50
    },
    tst: {
        type: Date,
        default:Date.now
    }
});



const Itemc =mongoose.model('itemc',ItemcSchema);
module.exports = Itemc;