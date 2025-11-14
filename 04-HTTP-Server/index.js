const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
  const log = `${new Date().toLocaleString()} : ${
    req.url
  } New Request Received \n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        res.end("I am Sourav Biswas");
        break;
      default:
        res.end("404 NOt Found");
    }
  });
});
myServer.listen(3000, () => {
  console.log("Server Started");
});
