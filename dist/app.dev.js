"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _task = _interopRequireDefault(require("./routes/task.js"));

var _dotenv = require("dotenv");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _error = require("./middlewares/error.js");

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
exports.app = app;
(0, _dotenv.config)({
  path: "./data/config.env"
});
app.use(_express["default"].json()); //middleware for using json data...

app.use((0, _cookieParser["default"])());
app.use((0, _cors["default"])({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use("/api/v1/users", _user["default"]);
app.use("/api/v1/task", _task["default"]);
app.get("/", function (req, res) {
  res.send("Nice Work!!");
});
app.use(_error.errorMiddleware);