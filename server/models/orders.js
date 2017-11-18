var mongoose = require('mongoose');
var customers = require('./customer');

var orders = mongoose.Schema(
    {
        id: Number,
        items:[{
            itemId: Number,
            amount: Number
        }],
        customer: {
            name: String,
            address: String,
            contactNumber: Number
        },
        dateOfOrder: String,
        active: Number
    },{
        collection: "orders"
    }
);

module.exports = mongoose.model('orders', orders);