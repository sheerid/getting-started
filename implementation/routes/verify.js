var bearerToken = require("../sheerid/token");
var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    res.render("verify/index"); 
});

module.exports = router;
