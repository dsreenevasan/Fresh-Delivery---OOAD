var mongoose = require('mongoose');

var user = mongoose.Schema(
    {
        id:Number,
        name:String,
        password:String,
        roles: String,
        phoneNumber:Number,
        email:String,
        address: String
    },{
        collection:"Users"
    }
);

module.exports = mongoose.model('user',user);