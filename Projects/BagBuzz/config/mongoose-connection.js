const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bagbuzz')
.then(()=>console.log("MongoDb Connected Successfully"))
.catch((err)=>console.log(err))

module.exports = mongoose.connection