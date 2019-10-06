"use strict";

var express = require("express");
var router = express.Router();

// Use the controllers for functionality
var customers = require("../../controllers/customers.controller");

// Setup the routes by redirecting to the appropriate controller method
router.get("/", customers.getAllCustomers);
router.put("/:id", customers.updateCustomer)
router.get("/:id", customers.getCustomerById);

module.exports = router;