const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n ${new Date().toLocaleString()} : IP Address - ${req.ip}, Method:${
        req.method
      }, Path : ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports={
    logReqRes
}