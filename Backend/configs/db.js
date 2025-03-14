const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect("mongodb+srv://user:123@cluster0.xawpc.mongodb.net/chinnu?retryWrites=true&w=majority&appName=Cluster0");

module.exports = { connection };
