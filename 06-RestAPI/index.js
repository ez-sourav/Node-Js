const express = require("express");
const {connectMongoDb} = require('./connection.js')
const {logReqRes} = require('./middlewares/index.js')
const userRouter = require('./routes/user.js')

const app = express();
// connection 
connectMongoDb('mongodb://127.0.0.1:27017/sourav-1').then(()=> console.log("Mongodb Connected Successfully."))

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('./log.txt'));

// Routers 
app.use('/user',userRouter)

app.listen(3000, () => {
  console.log("Server started : 3000");
});
