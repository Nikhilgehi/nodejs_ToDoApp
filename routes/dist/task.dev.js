"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _task = require("../controllers/task.js");

var _auth = require("../middlewares/auth.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/new", _auth.isAuthenticated, _task.newTask);
router.get("/my", _auth.isAuthenticated, _task.getMyTask);
router.route("/:id").put(_auth.isAuthenticated, _task.updateTask)["delete"](_auth.isAuthenticated, _task.deleteTask);
var _default = router;
exports["default"] = _default;