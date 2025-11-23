const express = require("express");
const app = express();
const path = require('path')

const { connectToMongoDb } = require("./connect");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')


connectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDb Connected")
);

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use("/url", urlRoute);
app.use('/user',userRoute)
app.use('/',staticRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: new Date().toLocaleString(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(3000, () => {
  console.log("Server Started");
});
