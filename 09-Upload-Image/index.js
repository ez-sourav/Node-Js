const path = require("path");
const multer  = require('multer')
const express = require("express");

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' })

app.set("view engine","ejs");
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({extended:false}))

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post('/upload',upload.single(''),(req, res) => {
  
})

app.listen(PORT, () => {
  console.log('Server running on',PORT);
});
