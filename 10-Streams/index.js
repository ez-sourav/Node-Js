const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    fs.readFile('./sample.txt',(err,data)=>{
        res.end(data);
    });
});

app.listen(PORT,()=>{
    console.log("Sever Started at",PORT);
})