const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const CustomerSchema =new Schema({
    cId:{
        type:String
    },
    cFirstName:{
        type:String,
        required:[true,"Please Enter A name"]
    },
    cLastName:{
        type:String
    },
    cEmail:{
        type:String
    },
    contactno:{
        type:String
    },
});

const Customer =mongoose.model('customer',CustomerSchema);
module.exports = Customer;