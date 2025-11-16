import expess from 'express'
const app = expess()
app.get('/',(req,res)=>{
    return res.send("HEllo From HOme PAge")
})
app.get('/about',(req,res)=>{
    return res.send("Hello From About Page " + 'hey '+req.query.name+ 'your age is '+ req.query.age)
})

app.listen(2000,()=> console.log("Server started"));