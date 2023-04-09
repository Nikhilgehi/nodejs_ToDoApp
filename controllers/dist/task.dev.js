"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTask = exports.updateTask = exports.getMyTask = exports.newTask = void 0;

var _error = _interopRequireDefault(require("../middlewares/error.js"));

var _task = require("../models/task.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var newTask = function newTask(req, res, next) {
  var _req$body, title, description;

  return regeneratorRuntime.async(function newTask$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description;
          console.log("working 1");
          _context.next = 4;
          return regeneratorRuntime.awrap(_task.Task.create({
            title: title,
            description: description,
            user: req.user
          }));

        case 4:
          console.log("working 2");
          res.status(201).json({
            success: true,
            message: "Task added Successfully"
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.newTask = newTask;

var getMyTask = function getMyTask(req, res, next) {
  var userid, task;
  return regeneratorRuntime.async(function getMyTask$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userid = req.user._id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_task.Task.find({
            user: userid
          }));

        case 3:
          task = _context2.sent;
          res.status(200).json({
            success: true,
            task: task
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getMyTask = getMyTask;

var updateTask = function updateTask(req, res, next) {
  var id, task;
  return regeneratorRuntime.async(function updateTask$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_task.Task.findById(id));

        case 3:
          task = _context3.sent;

          if (task) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", next(new _error["default"]("Task not found", 404)));

        case 6:
          task.isCompleted = !task.isCompleted;
          _context3.next = 9;
          return regeneratorRuntime.awrap(task.save());

        case 9:
          res.status(200).json({
            success: true,
            message: "Task Updated!"
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updateTask = updateTask;

var deleteTask = function deleteTask(req, res, next) {
  var id, task;
  return regeneratorRuntime.async(function deleteTask$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id.id;
          task = _task.Task.findById(id);

          if (task) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", next(new _error["default"]("Task Not Found", 404)));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(task.deleteOne(id));

        case 6:
          res.status(200).json({
            success: true,
            message: "Task Deleted"
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.deleteTask = deleteTask;