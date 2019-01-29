const express = require('express');
const router =express.Router();
const Emp =require('../modules/emp');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/authenticate', (req, res, next) => {
    const empId = req.body.empId;
    const password = req.body.password;
  
    Emp.getUserByUsername(empId, (err, emp) => {
      if(err) throw err;
      if(!emp) { 
        return res.json({success: false, msg: 'User not found'});
      }
  
      Emp.comparePassword(password, emp.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign({data: emp}, config.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({
            success: true,
            token: 'JWT '+token,
            emp: {
              id: emp._id,
              empId: emp.empId,
              eType: emp.eType,
              email: emp.eEmail
            }
          })
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
  });



router.get("/register",passport.authenticate('jwt', {session:false}),(req,res,next)=>{
    res.send("Reg works");
});

 module.exports =router;