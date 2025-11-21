const express = require("express");
const app = express();
const { connectToMongoDb } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

connectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDb Connected")
);

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
            timestamp:new Date().toLocaleString(),
        }, 
      },
    }
  );
  res.redirect(entry.redirectURL)
});

app.listen(3000, () => {
  console.log("Server Started");
});
