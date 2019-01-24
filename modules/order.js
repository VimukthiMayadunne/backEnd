const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let OrderSchema = new Schema({
    oId: {
        type: String
    },
    iId: {
        type: String
    },
    cId: {
        type: String
    },
    dueDate: {
        type: Date
    },
    qntity: {
        type: Number
    },
    complete: {
        type: Number,
        default:0

    },
    stat: {
        type: String,
        default: 'Due'
    }
});

const Order =mongoose.model('order',OrderSchema);
module.exports = Order;