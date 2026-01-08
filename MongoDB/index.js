const express = require('express');
const app = express();
const usermodel = require('./useModel')

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(3000,()=>{
    console.log("Server Started at 3000");
})