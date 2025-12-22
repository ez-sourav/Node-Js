require('dotenv').config()
const express = require('express');
const PORT = 3000;
const app = express();
const connectDB = require('./config/db')
const signup = require('./routes/signup')
const login = require('./routes/login')
const logout = require('./routes/logout')
const auth = require('./middleware/auth')
const cookieParser = require('cookie-parser')

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',signup);
app.use('/',login);
app.use('/',logout);

app.use(cookieParser())

app.get('/dashboard',auth ,(req,res)=>{
    res.send("Welcome to Dashboard");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server Started At ${PORT}`);
})