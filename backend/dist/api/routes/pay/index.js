"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = _interopRequireDefault(require("express"));
var _vnpay = require("./vnpay.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = exports.router = _express["default"].Router();
router.use('/vnpay', _vnpay.router);