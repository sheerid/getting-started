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
            res.redirect("/redeem");
        } else {
            res.redirect("/upload");
        }
    }
    sheerid.verifyIdentity(req.body, responseHandler);
});

router.get("/redeem", function(req, res) {
    res.render("redeem", {couponCode: req.query.couponCode});
});
router.get("/upload", function(req, res) {
    res.render("upload");
});

module.exports = router;
