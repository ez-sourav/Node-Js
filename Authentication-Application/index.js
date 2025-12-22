require('dotenv').config()
const express = require('express');
const PORT = 3000;
const app = express();
const connectDB = require('./config/db')
const authRoute = require('./routes/signup')

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/',authRoute);

app.get('/',(req,res)=>{
    res.send("Server is running...");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server Started At ${PORT}`);
})