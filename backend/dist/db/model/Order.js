"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Schema for creating orders
var OrderSchema = new _mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  customer_name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  products: {
    type: [{
      productId: {
        type: Number
      },
      color: {
        type: String
      },
      image: {
        type: String
      },
      new_price: {
        type: Number
      },
      old_price: {
        type: Number
      },
      quantity: {
        type: Number
      }
    }],
    required: true
  },
  note: {
    type: String,
    "default": null
  },
  date: {
    type: Date,
    "default": Date.now
  },
  payment_modal: {
    type: String,
    required: true
  },
  payment_status: {
    type: Number,
    required: true,
    "default": 0
  },
  status: {
    type: String,
    "default": "Chờ xác nhận"
  }
});
var OrderModel = _mongoose["default"].model('Order', OrderSchema);
var _default = exports["default"] = OrderModel;