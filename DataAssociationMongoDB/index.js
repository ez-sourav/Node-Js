const express = require('express');
const app = express();
const PORT = 3000;
const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/create', async (req, res) => {
  const user = await userModel.create({
    name: "Sourav Biswas",
    age: 22,
    email: "sourav@gmail.com",
  })

  res.send(user);
});
app.get('/post/create', async (req, res) => {
  const post = await postModel.create({
    postdata: "This is a Post Title",
    user: "696392e04a52f68b987e30a4",
    email: "sourav@gmail.com",
  })
  let user = await userModel.findOne({ _id: "696392e04a52f68b987e30a4" })
  user.posts.push(post._id);
  await user.save();

  res.send({ post, user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
