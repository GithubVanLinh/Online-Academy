const mongoose = require("mongoose");

const url = process.env.MONGODB_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // we're connected!
  console.log("Connect database successfully!");
});

module.exports = db;
