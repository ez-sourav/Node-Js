const express = require("express");
const users = require("./USER_DATA.json");
const fs = require("fs");

const app = express();

//Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next) =>{
  fs.appendFile('./log.txt',`\n ${new Date().toLocaleString()} : IP Address - ${req.ip}, Method:${req.method}, Path : ${req.path}\n`,(err,data)=>{
   next() 
    })
  
})



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
  res.setHeader("X-MyName","Sourav Biswas");
  return res.json(users);
});

// if route same so we can do this type
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user){
      res.status(404).json({error:"User Not Found"})
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

app.post("/api/users", (req, res) => {
  //TODO: Create new user
  const body = req.body;

  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./USER_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({
      status: "Success",
      id: users.length,
    });
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
