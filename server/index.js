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

const maxConnectRetries = 30;
var connectRetries = 0;
const connectInterval = 1000;
var connectWithRetry = function() {
    return mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, autoReconnect: true}, function(err) {
        if (err) {
            if (connectRetries === maxConnectRetries) {
                console.error("Failed to connect to mongo", err);
                throw(err);
            }
            console.error(`Failed to connect to mongo on startup - retrying in ${connectInterval} msec`);
            setTimeout(connectWithRetry, connectInterval);
            connectRetries++;
        }
    });
};
connectWithRetry();

// Connect to MongoDB
var db = mongoose.connection;
db.on("error", function(err) {
    console.error(`Mongo connection error occurred: ${err.message}`);
});
db.once("open", function() {
    console.log("Database connection open");
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