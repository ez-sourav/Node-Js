require('dotenv').config()
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const connectDB = require('./config/db')
const signup = require('./routes/signup')
const login = require('./routes/login')
const logout = require('./routes/logout')
const auth = require('./middleware/auth')
const cookieParser = require('cookie-parser')
const guest = require("./middleware/guest");

connectDB();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/',signup);
app.use('/',login);
app.use('/',logout);


app.get("/login", guest, (req, res) => {
  res.render("login", {
    error: req.query.error || null,
    success: req.query.success || null,
  });
});

app.get("/signup", guest, (req, res) => {
  res.render("signup", {
    error: req.query.error || null,
  });
});

app.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", {
    user: req.user,
    success: req.query.success || null,
  });
});

app.listen(PORT,(req,res)=>{
    console.log(`Server Started At ${PORT}`);
})