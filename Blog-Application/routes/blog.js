const {Router} = require('express')
const router = Router();

router.get('/add-new',(req,res)=>{
    return res.render('addBlogs',{
        user:req.user,
    })
})

module.exports = router;
