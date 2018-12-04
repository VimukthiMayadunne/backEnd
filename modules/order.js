const mongoose =require('mongoose');
const Schema =mongoose.Schema;


let OrderSchema = new Schema({
    itemname: {
        type: String
    },
    dueDate: {
        type: String
    },
    qntity: {
        type: Number
    },
    stat: {
        type: String,
        default: 'Due'
    }
});

const Order =mongoose.model('order',OrderSchema);
module.exports = Order;