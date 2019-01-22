const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const EmpSchema =new Schema({
    empId:{
        type:String,
        required:[true,"E ID is Required"]
    },
    eFirstName:{
        type:String,
        required:[true,"Enter A Name"]
    },
    eLastName:{
        type:String
    },
    eType:{
        type:String
    },
    password:{
        type:String
        //required:[true,"Please add A password"]
    },
    eEmail:{
        type:String
    },
    contactNo:{
        type:String
    },
});

const Emp =mongoose.model('employee',EmpSchema);
module.exports = Emp;