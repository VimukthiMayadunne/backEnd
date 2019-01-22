const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const CustomerSchema =new Schema({
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
    cContactNo:{
        type:String
    },
});

const Customer =mongoose.model('customer',CustomerSchema);
module.exports = Customer;