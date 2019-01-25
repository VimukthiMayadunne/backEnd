const jwt = require('jsonwebtoken');
const secretekey = "myapplicationsecretekey";
const datamodelsUser = require("../datamodels/token");

module.exports = {
    "secrete" : secretekey,
}

module.exports.verifytoken =function (req,res,next){
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader);
    if(typeof bearerHeader != 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token,secretekey,(err,userdata)=>{
            if(err){
                res.sendStatus(401);
            } 
            else{
                datamodelsUser.matchtoken(bearerToken,(err,mached)=>{
                    //console.log(mached);
                    if(err) throw err;
                    else if(mached){
                        //console.log("token mached");
                        req.user=userdata;
                        next();
                    }else{
                        res.json({state:false,msg:"token expired!"})
                    }
                })
                
            }
        });

        
    } else{
        res.sendStatus(401);

    }
};