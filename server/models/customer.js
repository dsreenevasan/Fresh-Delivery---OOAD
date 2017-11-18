var mongoose = require('mongoose');

var customer = mongoose.Schema(
    {
        id:Number,
        name:String,
        password:String,
        phoneNumber:Number,
        email:String,
        address: String,
        isVerified: Boolean
    },{
        collection:"Customers"
    }
);

module.exports = mongoose.model('customer',customer);