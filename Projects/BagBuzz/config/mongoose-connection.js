const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

mongoose.connect(`${config.get("MONGODB_URI")}/bagbuzz`)
  .then(() => dbgr("MongoDb Connected Successfully"))
  .catch(err => dbgr(err));

module.exports = mongoose.connection;