const express = require("express");
const users = require("./USER_DATA.json");
const mongoose = require("mongoose");
const fs = require("fs");
const { type } = require("os");

const app = express();

// Connection mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/sourav-1")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log("Mongo error : ", err));

// Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
},{timestamps:true});

// Model
const User = mongoose.model("user", userSchema);

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `\n ${new Date().toLocaleString()} : IP Address - ${req.ip}, Method:${
      req.method
    }, Path : ${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

//Routes
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Sourav Biswas");
  return res.json(users);
});

// if route same so we can do this type
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    // Edit user with ID

    const id = parseInt(req.params.id);
    const body = req.body;

    // find user index
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ status: "User not found" });
    }

    // update the user (merge old data + new data)
    users[index] = {
      ...users[index],
      ...body,
    };

    // save updated users list
    fs.writeFile("./USER_DATA.json", JSON.stringify(users), () => {
      return res.json({
        status: "User Updated",
        user: users[index],
      });
    });
  })
  .delete((req, res) => {
    // Delete user with ID
    const id = parseInt(req.params.id);

    const checkUser = users.find((user) => user.id === id);
    if (!checkUser) {
      return res.status(404).json({ message: "User not Found" });
    }
    console.log(checkUser);
    const updatedUsers = users.filter((user) => user.id !== id);
    console.log(updatedUsers);
    fs.writeFile("./USER_DATA.json", JSON.stringify(updatedUsers), () => {
      return res.json({ status: "User Deleted", id: id });
    });
  });

app.post("/api/users", async(req, res) => {
  //TODO: Create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // users.push({ id: users.length + 1, ...body });
  // fs.writeFile("./USER_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({
  //     status: "Success",
  //     id: users.length,
  //   });
  // });

  // now we do help of mongoose 

  const result  = await User.create({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title,
  });


  return res.status(201).json({
      status: "Success",
      
    });

});

// app.get('/api/users/:id',(req,res)=>{
//     const id =parseInt(req.params.id);
//     const user = users.find(user => user.id === id)
//     return res.json(user)
// })

// app.patch('/api/users/:id',(req,res)=>{
//     //TODO: Edit the user with id
//     return res.json({
//         status:"Pending"
//     });
// })
// app.delete('/api/users/:id',(req,res)=>{
//     //TODO: Delete the user with id
//     return res.json({
//         status:"Pending"
//     });
// })

app.listen(3000, () => {
  console.log("Server started : 3000");
});
