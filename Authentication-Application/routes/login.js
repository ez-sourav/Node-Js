const jwt = require('jsonwebtoken');
const express = require('express')
const User = require('../models/user');
const bcrypt = require('bcrypt')

const router = express.Router();

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;

    //check email or password is match or not
    const user = await User.findOne({email});
    if(!user) return res.json({message:"User Not Found"});

    // compare user input password and old password that alredy in DB
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(!passwordMatch) return res.json({message:"Worng Password"});
    
    const token = jwt.sign({id:user._id},"secretkey");

    res.cookie("token",token);
    res.status(200).json({
        message:"Login Success"
    })
})

module.exports = router