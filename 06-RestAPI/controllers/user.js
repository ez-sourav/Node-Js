const User = require("../models/user");

async function handelGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handelGetUserById(req,res){
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    }
    return res.json(user);
}

async function handelUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email,
      gender: req.body.gender,
      jobTitle: req.body.job_title,
    });
    return res.json({ status: "Success" });
}

async function handelDeleteUserById(req,res){
     await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "User Deleted", id: req.params.id });
}
async function handelCreateNewUser(req,res){
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

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({
    status: "Success",
    id:result._id,
  });
}

module.exports ={
    handelGetAllUsers,
    handelGetUserById,
    handelUpdateUserById,
    handelDeleteUserById,
    handelCreateNewUser,
}