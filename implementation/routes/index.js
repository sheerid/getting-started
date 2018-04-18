var bearerToken = require("../sheerid/token");
var express = require("express");
var router = express.Router();

const request = require('request')

var token = bearerToken.getToken();


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
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;
