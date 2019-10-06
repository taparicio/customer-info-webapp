// index.js
// Main entry point for the RESTful backend server

var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");

// Initialize the Application
var serverPort = process.env.PORT || 8080;
var app = express();

// Setup mongoose connection to MongoDB
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/CustomersDatabase"
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});

// Connect to MongoDB
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
    // connection successful
});

// Setup express middleware for parsing JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup express middleware for allowing CORS (from angular front-end)
app.use(cors());

// Setup API routing
var api = require("./routes/api.route");
app.use("/api", api);

// TODO: route all non-defined routes to 404 not found error

// Run the server
app.listen(serverPort, () => {
    console.log(`Starting customer-info RESTful server on port ${serverPort}`);
});