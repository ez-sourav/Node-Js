const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.post("/register", async (req, res) => {
  const { username, name, email, password, age } = req.body;
  const checkUser = await userModel.findOne({ email });
  if (!checkUser) {
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hashedPassword)=>{
            const user = await userModel.create({
              username,
              name,
              email,
              password:hashedPassword,
              age,
            });
            res.json({ user, message: "User Created Successfully" });
        })
    })
  } else {
    return res.status(500).send("User Already Registered! ");
  }
});

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});
