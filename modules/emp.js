const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const config =require('../config/database');
const bcrypt =require('bcryptjs');

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

module.exports.getUserbyId =function(id ,callback){
    Emp.findById(id ,callback);
}

module.exports.getUserByUsername = function(empId, callback) {
    const query = {empId: empId}
    Emp.findOne(query, callback);1
  }
  
  module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback);
      });
    });
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }