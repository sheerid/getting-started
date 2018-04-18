var bearerToken = require("../sheerid/token");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.render("landing"); 
});

router.get("/offers", function(req, res){
    res.render("offers"); 
});

router.get("/verify", function(req, res){
    res.render("verify"); 
});

module.exports = router;
