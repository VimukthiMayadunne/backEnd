const express = require('express');
const bodyParser = require('body-parser');
const cors = require( 'cors');
const mongoose = require('mongoose'); 
const app = express();

mongoose.connect("mongodb://localhost:27017/app", { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
app.use(cors());
app.use(bodyParser.json());

app.use('/order',require('./routes/order'));
app.use('/emp',require('./routes/emp'));
app.use('/customer',require('./routes/customer'));
app.use('/item',require('./routes/item'));
app.use('/count',require('./routes/count'));


app.listen(4000,function(){
    console.log("Listning on Port 4000");
});

   
