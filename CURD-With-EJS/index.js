const express = require('express');
const path = require('path');
const userModel = require('./models/user');
const app = express();

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/read',async(req,res)=>{
    const allusers =await userModel.find({})
    res.render('read',{users:allusers})
})

app.post('/create',async (req,res)=>{
    const {name,email,imageurl} = req.body
    const createdUser = await userModel.create({
        name,
        email,
        imageurl,
    })
    res.redirect('/read'); 
})

app.get('/delete/:id',async (req,res)=>{
    const userId = req.params.id
    const deletedUser =await userModel.findOneAndDelete({_id:userId})
    res.redirect('/read')
})

app.listen(3000,()=>{
    console.log("Server Started At 3000");
})