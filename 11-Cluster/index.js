const express = require('express');
const app = express();
const PORT = 3000;

app.get('/',(req,res)=>{
    return res.json({
        message:"Hello From Express Server "+ process.pid,
    })
})
app.listen(PORT,()=>{
    console.log("Server Started At Port ", PORT);
})