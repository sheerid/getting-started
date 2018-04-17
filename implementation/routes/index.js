var bearerToken = require("../sheerid/token");
var express = require("express");
var router = express.Router();

var token = bearerToken.getToken();

router.get("/", function(req, res){
    console.log(token);
    res.render("landing"); 
});

module.exports = router;
