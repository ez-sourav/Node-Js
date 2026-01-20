const express = require("express");
const router = express.Router();

const owerModel = require("../models/owner-model");

if (process.env.NODE_ENV == "development") {
  router.post("/create", async (req, res) => {
    const owners = await owerModel.find();
    if (owners.length > 0) {
      return res
        .status(503)
        .send("You don't have permission to create new owner.");
    }
    const { fullname, email, password } = req.body;
    const createdOwner = await owerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

router.get("/admin", (req, res) => {
  const success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
