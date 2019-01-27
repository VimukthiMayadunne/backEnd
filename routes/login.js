const express = require('express');
const router =express.Router();
const Emp =require('../modules/emp');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/authenticate', (req, res, next) => {
    const eId = req.body.eId;
    const password = req.body.password;
  
    Emp.getUserByUsername(eId, (err, emp) => {
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
              id: user._id,
              eId: emp.eId,
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



router.get("/register",(req,res,next)=>{
    res.send("Reg")
});
router.get("/register",(req,res,next)=>{
    res.send("Reg")
});
router.get("/register",(req,res,next)=>{
    res.send("Reg")
});
 module.exports =router;