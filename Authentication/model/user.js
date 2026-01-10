const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/authtestapp")
  .then(() => console.log("MongoDB Connected Successully")
  )
  .catch((err) => console.error(err));

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:String,

},{timestamps:true});

module.exports = mongoose.model('user',userSchema);
