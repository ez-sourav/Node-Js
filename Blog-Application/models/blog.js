const { Schema, model } = require("mongoose");
const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        required:false,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref: "user",
    }
},{timestamps:true});

const Blog = mondel('blog',blogSchema);

module.exports =Blog;