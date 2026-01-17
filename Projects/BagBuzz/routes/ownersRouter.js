const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("Hey it's Working");
})

module.exports = router;