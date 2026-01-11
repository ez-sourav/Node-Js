const express = require('express');
const app = express();
const PORT = 3000;
const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/create', async(req, res) => {
  const user =await userModel.create({
    name:"Sourav Biswas",
    age:22,
    email:"sourav@gmail.com",
  })

  res.send(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
