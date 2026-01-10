const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const port = 3000;
const userModel = require("./model/user");

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  const { username, email, password, age } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hashedPassword) => {
      const createdUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        age,
      });

      const token = jwt.sign({ email, username, age }, "secret");
      res.cookie("token", token);
      res.json({ createdUser, message: "User Created Successfully" });
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("Something Went Worng");
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      const token = jwt.sign({ email:user.email}, "secret");
      res.cookie("token", token);
      return res.send("Your Are LoggedIn");
    }
    res.send("Something Went Worng");
  });
});

app.get("/logout", (req, res) => {
  res.render("logout");
});
app.post("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Serever Started At Port ${port}`);
});
