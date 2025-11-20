const mongoose = require("mongoose");
async function connectMongoDb(url) {
  // Connection mongoose

  return mongoose.connect(url);
}

module.exports={
    connectMongoDb,
}