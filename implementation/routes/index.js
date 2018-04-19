var sheerid = require("../sheerid");
const request = require('request')
const fileUpload = require("express-fileupload");
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

router.post("/verify", function(req, res){
    function responseHandler(response){
        if (response.result){
            res.redirect("/redeem?couponCode=" + response.metadata.rewardCode);
        } else {
            console.log(response);
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

router.post("/upload", function(req, res){
    if (!req.files)
        return res.status(400).send("No file was uploaded");
    var userFile = req.files.personalDocument;
    sheerid.reviewAsset(userFile);
});

module.exports = router;
