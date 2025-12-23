const jwt = require("jsonwebtoken");
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("All field are required");
    }

    //check email or password is match or not
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    // compare user input password and old password that alredy in DB
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).send("Invalid email or password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });
     return res.status(200).json({
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).send("login failed");
  }
});

module.exports = router;
