const {Router} = require('express')
const User = require('../models/user')

const router = Router();

router.get('/signin',(req,res)=>{
    return res.render('signin')
})

router.get('/signup',(req,res)=>{
    return res.render('signup')
})

router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();   // ⚠ only one save() call → no double hook
  return res.redirect('/');
});

module.exports = router;