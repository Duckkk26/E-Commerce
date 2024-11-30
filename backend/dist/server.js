import express from "express";
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { route } from "./api/routes/index.js";
import connection from "./db/connect.js";
import { fileURLToPath } from 'url';
var app = express();
app.use(express.json());
app.use(cors());
route(app);

// Chuyển đổi `import.meta.url` thành __dirname
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);

// Cấu hình để phục vụ tệp tĩnh từ thư mục "public"
app.use(express["static"](path.join(__dirname, '../public')));

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
dotenv.config();
var port = process.env.PORT;

// API Creation
app.get("/", function (req, res) {
  res.send("Epress App is running");
});

// Image Storage Engine
var storage = multer.diskStorage({
  destination: './upload/images',
  filename: function filename(req, file, cb) {
    var uniqueFilename = "".concat(uuidv4()).concat(path.extname(file.originalname));
    return cb(null, uniqueFilename);
  }
});
var upload = multer({
  storage: storage
});

// Creating upload endpoint for images
app.use('/images', express["static"]('upload/images'));
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
connection.then(function () {
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