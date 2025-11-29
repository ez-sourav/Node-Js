const express = require("express");
const router = express.Router();
const { handelGenerateNewShortURL ,handelGetAnalytics,deleteGenerateNewShortURL} = require("../controllers/url");

router.post("/", handelGenerateNewShortURL);

router.get("/analytics/:shortId",handelGetAnalytics)

router.delete("/:shortId",deleteGenerateNewShortURL)

module.exports = router;
