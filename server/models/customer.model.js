// customer.model.js
// Data model of a customer's information

"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema definition
var CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    surName: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    status: {
        type: String,
        required: true,
        enum: ["prospective", "current", "non-active"]
    },
    creationDateTime: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: [String]
    }
});

// Create the model for use by the controllers
module.exports = mongoose.model("Customer", CustomerSchema);
