const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { email, fullname, password } = req.body;
    const user = await userModel.findOne({email:email})
    if(user){
      req.flash('error',"You alreday have an account, please login.")
      return res.redirect('/');
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        if (err) return res.send(err.message);
        else {
          const user = await userModel.create({
            email,
            fullname,
            password: hashedPassword,
          });
          const token = generateToken(user);
          res.cookie("token", token);
          res.send("User Created Successfully");
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};


const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email:email})
    if(!user){
      req.flash("error","Email or Password inccorect")
      return res.redirect('/');
    }
    
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            const token = generateToken(user);
            res.cookie('token',token)
            res.redirect('/shop')
        }else{
          req.flash('error',"Email or Password inccorect")
          return res.redirect('/')
        }
    })
};

const logout = (req,res)=>{
  res.cookie('token',"");
  res.redirect('/');
}

module.exports = {
  registerUser,
  loginUser,
  logout,
};
