const mongoose =require('mongoose');
const Schema =mongoose.Schema;

let DatesSchema = new Schema({
    oDate: {
        type: Date
    },
    nDate: {
        type: Date
    }
});

const Dates =mongoose.model('dates',DatesSchema);
module.exports = Dates;