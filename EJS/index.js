const express = require('express');
const app = express();
const path = require('path')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/profiles/:username',(req,res)=>{
    const user = req.params.username; 
    res.send(`Hello ${user}`);
})
app.get('/profiles/:username/:age',(req,res)=>{
    const user = req.params; 
    res.send(`Hello ${user.username} your age is ${user.age}`);
})

app.listen(3000,()=>{
    console.log("The server is running on port 3000");
})