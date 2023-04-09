"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var schema = new _mongoose["default"].Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    required: true,
    type: String,
    select: false
  },
  CreatedAt: {
    requied: true,
    type: Date,
    "default": Date.now
  }
});

var User = _mongoose["default"].model("User", schema);

exports.User = User;