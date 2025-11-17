const express = require("express");
const users = require("./USER_DATA.json");

const app = express();

// app.get("/users", (req, res) => {
//   const html = `
//     <ul>
//     ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `;
//   res.send(html);
// });

//Routes
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get('/api/users/:id',(req,res)=>{
    const id =parseInt(req.params.id);
    const user = users.find(user => user.id === id)
    return res.json(user)
})

app.post('/api/users',(req,res)=>{
    //TODO: Create new user
    return res.json({
        status:"Pending"
    });
})
app.patch('/api/users/:id',(req,res)=>{
    //TODO: Edit the user with id
    return res.json({
        status:"Pending"
    });
})
app.delete('/api/users/:id',(req,res)=>{
    //TODO: Delete the user with id
    return res.json({
        status:"Pending"
    });
})

app.listen(3000, () => {
  console.log("Server started");
});
