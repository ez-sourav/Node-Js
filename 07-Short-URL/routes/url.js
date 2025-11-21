const express = require("express");
const router = express.Router();
const { handelGenerateNewShortURL ,handelGetAnalytics} = require("../controllers/url");

router.post("/", handelGenerateNewShortURL);

router.get("/analytics/:shortId",handelGetAnalytics)

module.exports = router;
