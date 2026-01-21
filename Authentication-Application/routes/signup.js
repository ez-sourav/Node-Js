const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user')


const router = express.Router();

router.post('/signup', async (req, res) => {

    try {

        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).send("All field are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send("User alredy exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            userName,
            email,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (error) {
        res.status(500).send("Server erorr");
    }
})

module.exports = router