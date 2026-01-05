const express = require('express');
const app = express();
const path = require('path')
const fs =require('fs')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs');

// app.get('/profiles/:username',(req,res)=>{
//     const user = req.params.username; 
//     res.send(`Hello ${user}`);
// })
// app.get('/profiles/:username/:age',(req,res)=>{
//     const user = req.params; 
//     res.send(`Hello ${user.username} your age is ${user.age}`);
// })

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render('index',{files});
    })
})
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/')
        }
    })
})

app.listen(3000,()=>{
    console.log("The server is running on port 3000");
})