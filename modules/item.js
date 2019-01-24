const mongoose =require('mongoose');
const Schema =mongoose.Schema;

let ItemSchema = new Schema({
    iId: {
        type: String
    },
    iName: {
        type: String
    },
    sLHours: {
        type: Number
    },
    sMHours: {
        type: Number
    },
});

const Item =mongoose.model('item',ItemSchema);
module.exports = Item;