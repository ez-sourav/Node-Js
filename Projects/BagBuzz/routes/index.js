const express = require("express");
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedIn');
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
  const error = req.flash('error');
  res.render("index", {error});
});

router.get('/shop',isloggedin,async(req,res)=>{
  const products = await productModel.find();
  res.render('shop',{products});
});

router.get('/logout',isloggedin,(req,res)=>{
  res.render('shop');
})
module.exports = router;
