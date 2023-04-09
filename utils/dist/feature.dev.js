"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendcookie = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sendcookie = function sendcookie(user, res, message) {
  var statusCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;

  var token = _jsonwebtoken["default"].sign({
    _id: user._id
  }, process.env.JWT_SECRET);

  console.log(process.env.NODE_ENV);
  console.log(process.env.NODE_ENV === "Development");
  res.status(statusCode).cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    sercure: process.env.NODE_ENV === "Development" ? false : true
  }).json({
    success: true,
    message: message
  });
};

exports.sendcookie = sendcookie;