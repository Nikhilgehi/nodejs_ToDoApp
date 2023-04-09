"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDb = function connectDb() {
  _mongoose["default"].connect(process.env.MONGO_URI, {
    dbName: "newAPI"
  }).then(function (c) {
    console.log("database connected with ".concat(c.connection.host, "!!"));
  })["catch"](function (e) {
    console.log(e);
  });
};

exports.connectDb = connectDb;