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
    // query for required fields
    var templateId = "5ad783da7584b813e77c4a6b";
    var options = {
        url: "https://services-sandbox.sheerid.com/rest/0.5/required_fields/template/" + templateId,
        method: "GET",
        json: true,
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    request(options, function(err, response, body){
        if (err) {console.log(err)};
        res.render("verify", body);
    });
});

router.post("/verify", function(req, res){
    console.log(req.body);
});

module.exports = router;
