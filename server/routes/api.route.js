"use strict";

var express = require("express");
var router = express.Router();

// Use the API routers
var customers = require("./api/customers.route");

// Route the API calls to the appropriate router
router.use("/customers", customers);

module.exports = router;