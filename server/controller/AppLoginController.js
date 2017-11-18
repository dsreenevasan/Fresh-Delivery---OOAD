var Users = require('../models/users');
var Customers = require('../models/customer');

module.exports.getUser = function(req,res){
console.log("hii");
    console.log(req);
    Users.findOne({email: req.body.username},function(err,data){
        if(err){
            throw err;
        }else if(data == null){
            console.log("User not found");
            res.send({code: 500, message: "user not found"});
        }else{
            console.log('server:'+data);
            if(data.password == req.body.password){
                res.send(data);
            }
            else{
                res.send({code: 500, message: "wrong password"});
            }
        }

    });

};

module.exports.createUser = function(req,res){
    console.log("req" + JSON.stringify(req.body));

    Users.findOne({id: req.body.id}, function(err, data){
        console.log("hi");
        if(err){
            /*throw err;*/
            res.send(err);
        }
        else if(data == null){
            console.log("lol");
            var recentUserQuery = Users.find({}).sort({id : -1}).limit(1);
            recentUserQuery.exec(function(err, data) {
                if (err) {
                    return err;
                }
                req.body.id = data[0].id + 1;
                var entry = new Users(req.body);
                console.log(JSON.stringify(entry));
                entry.save(function(err){
                    if(err){
                        throw err;
                    }
                    else{
                        console.log("User successfully created");
                    }
                });
                res.send("success");
            });
        }
        else{
            console.log("user already exists");
            res.send("already exists");
        }
    })
};


module.exports.createCustomer = function(req,res){
    console.log("req" + JSON.stringify(req.body));

    Customers.findOne({id: req.body.id}, function(err, data){
        console.log("hi");
        if(err){
            /*throw err;*/
            res.send(err);
        }
        else if(data == null){
            console.log("lol");
            var entry = new Customers(req.body);
            console.log(JSON.stringify(entry));
            entry.save(function(err){
                if(err){
                    throw err;
                }
                else{
                    console.log("Customer successfully created");
                }
            });
            res.send("success");
        }
        else{
            console.log("Customer already exists");
            res.send("already exists");
        }
    })
};
