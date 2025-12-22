const express = require('express')
const router = express.Router();


router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
});

module.exports = router
