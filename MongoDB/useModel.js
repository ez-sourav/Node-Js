const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/usermodel')
.then(()=> console.log("MongoDb Connected"))
.catch((err)=>console.error(err))

const userSchema = mongoose.Schema({
    name:String,
    username:String,
    email:String,
},{timestamps:true})

module.exports = mongoose.model('user',userSchema);