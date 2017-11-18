var mongoose = require('mongoose');
var items = require('./items');

var requestPurchase = mongoose.Schema(
    {
        item: {
            id: Number,
            name: String,
            price: Number,
            category: String
        },
        stock: Number, 
        isApproved: Number
    },{
        collection: "RequestPurchase"
    }
);

module.exports = mongoose.model('requestPurchase', requestPurchase);