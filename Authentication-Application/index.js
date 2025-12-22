require('dotenv').config()
const express = require('express');
const PORT = 3000;
const app = express();
const connectDB = require('./config/db')


connectDB();
app.get('/',(req,res)=>{
    res.send("Hello From Ecpress");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server Started At ${PORT}`);
})