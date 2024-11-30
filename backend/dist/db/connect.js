"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var uri = process.env.MONGODB_URI;

// Database Connection with MongoDB
var connection = _mongoose["default"].connect(uri).then(function () {
  console.log("Connected to MongoDB");
})["catch"](function (error) {
  console.error("Error connecting to MongoDB:", error);
});
var _default = exports["default"] = connection;