import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
var uri = process.env.MONGODB_URI;

// Database Connection with MongoDB
var connection = mongoose.connect(uri).then(function () {
  console.log("Connected to MongoDB");
})["catch"](function (error) {
  console.error("Error connecting to MongoDB:", error);
});
export default connection;