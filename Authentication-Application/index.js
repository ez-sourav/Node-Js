require('dotenv').config()
const express = require('express');
const PORT = 3000;
const app = express();
const connectDB = require('./config/db')
const signup = require('./routes/signup')
const login = require('./routes/login')

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',signup);
app.use('/',login);

app.get('/',(req,res)=>{
    res.send("Server is running...");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server Started At ${PORT}`);
})