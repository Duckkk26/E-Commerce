"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Schema for creating products
var ProductSchema = new _mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String
  },
  new_price: {
    type: Number,
    required: true
  },
  old_price: {
    type: Number,
    required: true
  },
  variants: {
    type: [{
      variant_id: {
        type: String,
        required: true
      },
      details: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }]
  },
  colors: {
    type: [{
      color: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      new_price: {
        type: Number,
        required: true
      },
      old_price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        "default": 0
      },
      sold: {
        type: Number,
        "default": 0
      }
    }]
  },
  total_quantity: {
    type: Number,
    "default": 0
  },
  total_sold: {
    type: Number,
    "default": 0
  },
  description: {
    type: String,
    required: true
  },
  specifications: {
    type: Object
  },
  label: {
    type: String
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var ProductModel = _mongoose["default"].model("Product", ProductSchema);
var _default = exports["default"] = ProductModel;