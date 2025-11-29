const express = require('express')
const router = express.Router();
const {handelUserSignup,handelUserLogin} = require('../controllers/user')

router.post('/',handelUserSignup)
router.post('/login',handelUserLogin)
module.exports= router