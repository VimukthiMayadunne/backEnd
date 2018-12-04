const mongoose =require('mongoose');
const Schema =mongoose.Schema;

let ItemSchema = new Schema({
    iName: {
        type: String
    },
    sLHours: {
        type: Number
    },
    sMHours: {
        type: Number
    },
    Now:{
        type: String,
        default: Date.now()
    }

});

const Item =mongoose.model('item',ItemSchema);
module.exports = Item;