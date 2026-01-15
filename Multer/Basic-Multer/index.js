const express = require('express')
const app  =  express();
const multer = require('multer')
const path = require('path')
const ejs = require('ejs')
const crypto  = require('crypto')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine",'ejs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12,(err,bytes) =>{
        const fn  =  bytes.toString('hex') + path.extname(file.originalname)
        cb(null, fn)
    })
  }
})

const upload = multer({ storage: storage })

app.get('/',(req,res) =>{
    res.render('index')
})

app.post('/upload',upload.single('image'),(req,res) =>{
    console.log(req.file);
    res.redirect('/');
})

app.listen(3000,() =>{
    console.log("Server Started at 3000");
})