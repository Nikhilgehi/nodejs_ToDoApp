"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = void 0;

var _user = require("../models/user.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isAuthenticated = function isAuthenticated(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function isAuthenticated$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.cookies.token;

          if (token) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            success: false,
            message: "Login First"
          }));

        case 3:
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(_user.User.findById(decoded._id));

        case 6:
          req.user = _context.sent;
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.isAuthenticated = isAuthenticated;