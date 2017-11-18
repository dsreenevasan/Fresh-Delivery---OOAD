var Items = require('../models/items');
var Orders = require('../models/orders');
var PurchaseRequest = require('../models/purchaseRequest');
var async = require('async');

module.exports.getItems = function (req, res) {
  Items.find({}, function(err, data){
     if(err){
         throw err;
     }
      else if(data == null){
         console.log("no items");
         res.send({code:500, message: "no items found"});
     }
      else{
         console.log(JSON.stringify(data));
         res.send({code: 200, data: data});
     }
  });
};

module.exports.createItem = function(req,res){
    console.log("req" + JSON.stringify(req.body));

    /*Items.findOne({id: req.body.id}, function(err, data){
        console.log("hi");
        if(err){
            /!*throw err;*!/
            res.send(err);
        }
        else if(data == null){*/
            var recentItemQuery = Items.find({}).sort({id : -1}).limit(1);
            recentItemQuery.exec(function(err, data) {
                if (err) {
                    return err;
                }
                req.body.id = data[0].id + 1;
                /*console.log(JSON.stringify(data[0]));*/
                var entry = new Items(req.body);
                /*console.log(JSON.stringify(entry));*/
                entry.save(function(err){
                    if(err){
                        throw err;
                    }
                    else{
                        console.log("Item successfully created");
                    }
                });
                res.send("success");
            });

        /*}
        else{
            console.log("Item already exists");
            res.send("already exists");
        }
    })*/
};

module.exports.placeOrder = function(req, res) {
    console.log("inside Place order function");

    var lastOrderQuery = Orders.find({}).sort({id: -1}).limit(1);
    lastOrderQuery.exec(function (err, data) {
        if (err) {
            throw err;
        }
        req.body.id = data[0].id + 1;
        var orderId = req.body.id;
        var order = new Orders(req.body);
        console.log(JSON.stringify(order));
        order.save(function (err) {
            if (err) {
                throw err;
            }
            else {
                console.log("order successfully placed");
                var i = 0;
                (function loop(){
                    if(order.items[i]){
                        var amount = order.items[i].amount;
                        var itemId = order.items[i]._id;
                        Items.findOne({_id: itemId}, function (err, data) {
                            console.log("data from db - " + JSON.stringify(data));
                            data.availableStock = data.availableStock - amount;
                            if (data.availableStock == 0) {
                                data.active = 0;
                            }
                            Items.findOneAndUpdate({'_id': itemId},
                                {$set: {'active' : data.active, 'availableStock': data.availableStock}},
                                {upsert: true, multi: false, safe: true},
                                function (err, data) {
                                    if (err) {
                                        throw err;
                                    }
                                });
                        });
                        i++;
                        loop();
                    }
                }());
            }
            res.send({code: 200, message: orderId});
        });
    });
};

module.exports.cancelOrder = function(req, res){
  Orders.findOne({id: req.body.id}, function (err, data) {
      if(err){
          throw err;
      }
      else if(data == null){
          console.log("no order found");
          res.send({code: 500, message: "order not found"});
      }
      else {
          Orders.findOneAndUpdate(
              {'id': req.body.id},
              {$set: {'active': 0}},
              {upsert: true, multi: false, safe: true},
              function (err, data) {
                  if (err) {
                      throw err;
                  }
                  else{
                      console.log("successfully cancelled");
                      res.send({code: 200, message: "success"});
                  }
              })
            }
      })
};

module.exports.changePrice = function(req, res){
  var updateItems =  req.body;
    var i = 0;
    (function updatePrice(){
       if(updateItems[i]){
           Items.findOneAndUpdate(
               {'id': updateItems[i].id},
               {$set: {'price': updateItems[i].price}},
               {upsert: true, multi: false, safe: true},
               function(err, data){
                   if(err){
                       throw err;
                   }
                   else{
                       console.log("successfully updated");
                   }
               });
           i++;
           updatePrice();
       }
    })();
};

module.exports.requestItem = function(req, res){
    var entry = new PurchaseRequest(req.body);
    console.log(JSON.stringify(entry));
    entry.save(function(err){
        if(err){
            throw err;
        }
        else{
            console.log("Purchase Request successfully created");
        }
    });
};