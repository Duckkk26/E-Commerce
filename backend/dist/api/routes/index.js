"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.route = route;
var _product = require("./product.js");
var _user = require("./user.js");
var _brand = require("./brand.js");
var _order = require("./order.js");
var _cart = require("./cart.js");
var _address = require("./address.js");
var _index = require("./pay/index.js");
function route(app) {
  app.use('/product', _product.router);
  app.use('/user', _user.router);
  app.use('/cart', _cart.router);
  app.use('/brand', _brand.router);
  app.use('/order', _order.router);
  app.use('/address', _address.router);
  app.use('/pay', _index.router);
}