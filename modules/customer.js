const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const CustomerSchema =new Schema({
    cFirstName:{
        type:String,
        required:[true,"Namak Dapan pakayo"]
    },
    cLastName:{
        type:String
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
    cAddress:{
        type:String,
    }
});

const Customer =mongoose.model('customer',CustomerSchema);
module.exports = Customer;