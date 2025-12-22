const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user')


const router = express.Router();

router.post('/signup', async (req,res)=>{
    const {userName,email,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);

    await User.create({
        userName,
        email,
        password:hashedPassword
    });

    res.status(200).json({
        message:"Signup Successfull",
    })
})

module.exports = router