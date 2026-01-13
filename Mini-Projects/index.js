const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  const { username, name, email, password, age } = req.body;
  const checkUser = await userModel.findOne({ email });
  if (!checkUser) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        const user = await userModel.create({
          username,
          name,
          email,
          password: hashedPassword,
          age,
        });
        const token = jwt.sign({ email, userId: user._id }, "secret");
        res.cookie("token", token);
        res.json({ user, message: "User Created Successfully" });
      });
    });
  } else {
    return res.status(500).send("User Already Registered! ");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isLogdedIn,async (req, res) => {
  const user = await userModel.findOne({email:req.user.email})
  user.populate('posts')
  res.render("profile",{user});
});

app.post("/post", isLogdedIn,async (req, res) => {
  const user = await userModel.findOne({email:req.user.email})
  const {content} = req.body;
  const post = await postModel.create({
    user:user._id,
    content,
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect('profile')
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await userModel.findOne({ email });
  if (!checkUser) return res.send("Something Went Worng");
  bcrypt.compare(password, checkUser.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email, userId: checkUser._id }, "secret");
      res.cookie("token", token);
      res.status(200).redirect("profile");
    } else {
      res.redirect("login");
    }
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("login");
});

function isLogdedIn(req, res, next) {
  if (req.cookies.token === "") res.redirect("login");
  else {
    const data = jwt.verify(req.cookies.token, "secret");
    req.user = data;
    next();
  }
}

app.listen(3000, () => {
  console.log("Server Running On Port 3000");
});
