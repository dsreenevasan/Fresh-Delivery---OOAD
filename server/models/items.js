var mongoose = require('mongoose');

var items = mongoose.Schema(
    {
        id: Number,
        name: String,
        active: Number,
        availableStock: Number,
        price: Number,
        category: String
    },{
        collection: "Items"
    }
);

module.exports = mongoose.model('items', items);