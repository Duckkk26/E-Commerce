"use strict";

var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _cors = _interopRequireDefault(require("cors"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
var _uuid = require("uuid");
var _index = require("./api/routes/index.js");
var _connect = _interopRequireDefault(require("./db/connect.js"));
var _url = require("url");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
(0, _index.route)(app);

// Chuyển đổi `import.meta.url` thành __dirname
var _filename = (0, _url.fileURLToPath)(import.meta.url);
var _dirname = _path["default"].dirname(_filename);

// Cấu hình để phục vụ tệp tĩnh từ thư mục "public"
app.use(_express["default"]["static"](_path["default"].join(_dirname, '../public')));

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', _path["default"].join(_dirname, '../views'));
_dotenv["default"].config();
var port = process.env.PORT;

// API Creation
app.get("/", function (req, res) {
  res.send("Epress App is running");
});

// Image Storage Engine
var storage = _multer["default"].diskStorage({
  destination: './upload/images',
  filename: function filename(req, file, cb) {
    var uniqueFilename = "".concat((0, _uuid.v4)()).concat(_path["default"].extname(file.originalname));
    return cb(null, uniqueFilename);
  }
});
var upload = (0, _multer["default"])({
  storage: storage
});

// Creating upload endpoint for images
app.use('/images', _express["default"]["static"]('upload/images'));
app.post("/upload", upload.any(), function (req, res) {
  var fileNames = req.files.map(function (file) {
    return file.filename;
  });
  res.status(200).json({
    success: 1,
    image_urls: fileNames.map(function (filename) {
      return "http://localhost:".concat(port, "/images/").concat(filename);
    })
  });
});
_connect["default"].then(function () {
  app.listen(port, function (error) {
    if (!error) {
      console.log("Server is running on port ".concat(port, ". http://localhost:").concat(port));
    } else {
      console.log('Error' + error);
    }
  });
})["catch"](function (error) {
  console.error('Error connecting to MongoDB:', error);
});