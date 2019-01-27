const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require( 'cors');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
//var blacklist = require('express-jwt-blacklist');
//const user = require('./web/routes');
const config = require('./config/database');

const connectDB = mongoose.connect(config.database, { useNewUrlParser: true },(err)=>{
    if(err){
      console.log('-------------------------------');  
      console.log("Warning! Database not connected");
    }else{
      console.log("Database connected"); 
    }
});

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());



app.use('/login',require('./routes/login'));
app.use('/order',require('./routes/order'));
app.use('/emp',require('./routes/emp'));
app.use('/customer',require('./routes/customer'));
app.use('/item',require('./routes/item'));
app.use('/itemc',require('./routes/itemc'));
app.use('/manual',require('./routes/manual'));


app.listen(4000,function(){
    console.log("Listning on Port 4000");
});

   
