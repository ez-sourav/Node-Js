const express = require('express')
const router = express.Router();


router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login?success=Logged out successfully");
});
module.exports = router
