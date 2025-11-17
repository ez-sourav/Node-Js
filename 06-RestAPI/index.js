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


// if route same so we can do this type 
app.route('/api/users/:id').get((req,res)=>{
    const id =parseInt(req.params.id);
    const user = users.find(user => user.id === id)
    return res.json(user)
})
.patch((req,res)=>{
    // Edit user with ID
    return  res.json({status:"Pending"})
})
.delete((req,res)=>{
    // Delete user with ID
    return  res.json({status:"Pending"})
})


app.post('/api/users',(req,res)=>{
    //TODO: Create new user
    return res.json({
        status:"Pending"
    });
})

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
  console.log("Server started");
});
