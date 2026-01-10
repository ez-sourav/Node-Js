const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const port = 3000

app.use(cookieParser());

app.get('/', (req, res) => {
    // set cookie
//     res.cookie("name","sourav")
//   res.send('Hello World!')

// password hash 
    // bcrypt.genSalt(10,(err,salt)=>{
    //     bcrypt.hash('sourav',salt,(err,hash)=>{
    //         console.log(hash);
    //     })
    // })
    // res.send("Hashed Password ")

    // compaire Hash password
    bcrypt.compare('sourav ', '$2b$10$AwkGFEheMeyY1t4XvC45ZO9uHSd5rYIsgPtDGarOr5k3j1LFfrm2.', function(err, result) {
    console.log(result);
});
res.send("Compaire")
})
app.get('/read', (req, res) => {
    // read cookies
    console.log(req.cookies);
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Serever Started At Port ${port}`)
})
