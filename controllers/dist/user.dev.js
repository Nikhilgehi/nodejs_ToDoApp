"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.register = exports.getMyProfile = void 0;

var _user = require("../models/user.js");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _feature = require("../utils/feature.js");

var _error = _interopRequireDefault(require("../middlewares/error.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getMyProfile = function getMyProfile(req, res) {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

exports.getMyProfile = getMyProfile;

var register = function register(req, res, next) {
  var _req$body, name, email, password, user, hashedPassword;

  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(_user.User.findOne({
            email: email
          }));

        case 3:
          user = _context.sent;

          if (user) {
            res.status(404).json({
              success: false,
              message: "User already exists"
            });
          }

          _context.next = 7;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, 10));

        case 7:
          hashedPassword = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(_user.User.create({
            name: name,
            email: email,
            password: hashedPassword
          }));

        case 10:
          user = _context.sent;
          (0, _feature.sendcookie)(user, res, "Registered Successfully", 201);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.register = register;

var login = function login(req, res, next) {
  var _req$body2, email, password, user, isMatch;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_user.User.findOne({
            email: email
          }).select("+password"));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", next(new _error["default"]("Invalid Emailid or Password", 404)));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 8:
          isMatch = _context2.sent;

          if (isMatch) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            success: false,
            message: "Invalid Email or Password "
          }));

        case 11:
          (0, _feature.sendcookie)(user, res, "Welcome back,".concat(user.name), 200);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.login = login;

var logout = function logout(req, res) {
  return regeneratorRuntime.async(function logout$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.status(200).cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            sercure: process.env.NODE_ENV === "development" ? false : true
          }).json({
            success: true,
            user: req.user
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.logout = logout;