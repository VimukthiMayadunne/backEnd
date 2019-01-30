const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let StdSchema = new Schema({
    iId:{
        type: String
    },
    rRate: {
        type: Number,
    },
    sRate: {
        type: Number
    },
    bNeck:{
        type:String
    },
    sDate:{
        type:Date
    },
    fDate:{
        type:Date
    }
});



const Std =mongoose.model('std',StdSchema);
module.exports = Std;