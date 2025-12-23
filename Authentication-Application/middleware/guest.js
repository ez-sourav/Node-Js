const jwt = require("jsonwebtoken");

const guest = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect("/dashboard");
    } catch (err) {
      next();
    }
  } else {
    next();
  }
};

module.exports = guest;
