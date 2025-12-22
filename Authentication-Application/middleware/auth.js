const jwt = require('jsonwebtoken');
const auth = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token) return res.json({
        message:"Not Logged in ",
    })

    const decoded = jwt.verify(token,"secretkey");
    req.user = decoded;
    next();
};

module.exports = auth