var mongoose = require("mongoose");
//mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL, {useMongoClient: true});

module.exports.Todo = require("./todo");