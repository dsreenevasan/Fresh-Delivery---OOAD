var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.json({type: 'application/vnd.api+json'}));

var AppLoginController = require('../../controller/AppLoginController');
var ItemsController = require('../../controller/ItemsController');

    router.post('/getUser', function(req, res){
        console.log("asd");
        AppLoginController.getUser(req, res);
    });

    router.post('/createUser', function(req, res){
        console.log("createUser");
        AppLoginController.createUser(req, res);
    });

    router.post('/createItem', function (req, res) {
        console.log("createItem");
        ItemsController.createItem(req, res);
    });

    router.post('/createCustomer', function (req, res) {
        console.log("createCustomer");
        AppLoginController.createCustomer(req, res);
    });

    router.post('/placeOrder', function(req, res){
        console.log("placeOrder");
        ItemsController.placeOrder(req, res);
    });

    router.post('/cancelOrder', function(req, res){
        console.log("cancelOrder");
        ItemsController.cancelOrder(req, res);
    });

    router.get('/getItems', function(req, res){
        console.log('getItems');
        ItemsController.getItems(req,res);
    });

    router.get('/getUser', function(req, res){
        console.log('getUser');
        AppLoginController.getUser(req, res);
    });

    router.post('/changePrice', function(req, res){
        console.log("changePrice");
        ItemsController.changePrice(req, res);
    });

    router.post('/requestItem', function(req, res){
        console.log('requestItem');
        ItemsController.requestItem(req, res);
    });

module.exports = router;