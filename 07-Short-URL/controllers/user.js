const User = require("../models/user");
const URL = require("../models/url");

async function handelUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
//   const allurls = await URL.find({});

//   return res.render("home", { urls: allurls, id: null });
  return res.redirect('/')

}
async function handelUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });

  if(!user) return res.render('login',{
    error: 'Invalid Email or Password'
  })
//   const allurls = await URL.find({});

//   return res.render("home", { urls: allurls, id: null });
  return res.redirect('/')
}

module.exports = {
  handelUserSignup,
  handelUserLogin
};
