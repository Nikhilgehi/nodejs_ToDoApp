"use strict";

var _app = require("./app.js");

var _database = require("./data/database.js");

(0, _database.connectDb)();
console.log(process.env.PORT);

_app.app.listen(process.env.PORT, function () {
  console.log("Server  is working on port :".concat(process.env.PORT, " in ").concat(process.env.NODE_ENV, " mode"));
});