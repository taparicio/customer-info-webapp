"use strict";

var mongoose = require("mongoose");
var Customer = require("../models/customer.model");

// HTTP GET for listing all customers' information
exports.getAllCustomers = function(req, res) {
    Customer.find(function(err, customers) {
        if (err) {
            console.error(err);
            return res.status(400).send({
                message: err.message
            });
        } else {
            res.json(customers);
        }
    });
};

// HTTP GET for listing single customer's information
exports.getCustomerById = function(req, res) {
    Customer.findById(req.params.id, function(err, customer) {
        if (err) {
            return res.status(404).send({
                message: err.message
            });
        } else {
            res.json(customer);
        }
    });
};

// HTTP PUT for modifying a customer's information
exports.updateCustomer = function(req, res) {
    Customer.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, customer) {
        if (err) {
            return res.status(404).send({
                message: err.message
            });
        } else {
            res.json(customer);
        }
    });
}
