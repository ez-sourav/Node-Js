const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isloggedin, async (req, res) => {
  const products = await productModel.find();
  const success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isloggedin, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  let totalMRP = 0;
  let totalDiscount = 0;
  const platformFee = 20;

  user.cart.forEach((item) => {
    totalMRP += Number(item.price);
    totalDiscount += Number(item.discount);
  });

  const bill = totalMRP - totalDiscount + platformFee;

  res.render("cart", {
    user,
    totalMRP,
    totalDiscount,
    platformFee,
    bill,
  });
});

router.get("/addtocart/:productid", isloggedin, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });

  user.cart.push(req.params.productid);
  await user.save();

  req.flash("success", "Added to Cart");
  res.redirect("/shop");
});

router.get("/removefromcart/:productid", isloggedin, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });

  // remove selected product from cart
  user.cart = user.cart.filter((id) => id.toString() !== req.params.productid);

  await user.save();
  res.redirect("/cart");
});

router.get("/logout", isloggedin, (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
