const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase') 
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


const userSchema = mongoose.Schema({
    name: String,
    email:String,
    age:Number,
    posts:Array
});

module.exports = mongoose.model('user', userSchema);
