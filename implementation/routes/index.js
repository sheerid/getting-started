var sheerid = require("../sheerid");
var express = require("express");
var router = express.Router();

const request = require('request')

var token = sheerid.getToken();

router.get("/", function(req, res){
    res.render("landing"); 
});

router.get("/offers", function(req, res){
    res.render("offers"); 
});

router.get("/verify", function(req, res){
    res.render("verify");
});

router.post("/verify", function(req, res){
    function responseHandler(response){
        if (response.result){
            res.render("redeem");
        } else {
            res.render("upload");
        }
    }
    sheerid.verifyIdentity(req.body, responseHandler);
});

router.get("/redeem", function(req, res) {
    res.render("redeem", {couponCode: req.query.couponCode});
});

module.exports = router;
