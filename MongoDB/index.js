const express = require("express");
const app = express();
const userModel = require("./useModel");

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Gourav Biswas",
    username: "gourav04",
    email: "xyz@gmail.com",
  });
  res.send(createdUser);
});

app.get("/read", async (req, res) => {
  const user = await userModel.find({});
  res.send(user);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { email: "sourav@gmail.com" },
    { email: "sourav123@gmail.com" },
    { new: true }
  );
  if (!updatedUser) return res.json({ message: "User Not Found" });
  res.json({
    updatedUser,
    message: "User Updated Successfully",
  });
});

app.get("/delete", async (req, res) => {
  let user = await userModel.findOneAndDelete({ username: "gourav04" });
  if (!user) return res.json({ message: "User Not Found" });
  res.json({
    user,
    message: `${user.name} Deleted Successfully`,
  });
});

app.listen(3000, () => {
  console.log("Server Started at 3000");
});
