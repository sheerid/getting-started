const sheerid   = require("../sheerid"),
      request   = require("request"),
      express   = require("express"),
      router    = express.Router();


router.get("/", function(req, res){
    res.render("landing"); 
});

router.get("/offers", function(req, res){
    res.render("offers"); 
});

router.get("/verify", function(req, res){
    res.render("verify", { errorMessage: req.params.errorMessage });
});

router.post("/verify", function(req, res){
    console.log(req.body);
    function assetTokenResponseHandler(response) {
        if (response && response.token) {
            res.redirect("/upload?assetToken=" + response.token + "&reason=" + response.error);
        } else {
            res.redirect("back");
        }
    }

    function verificationResponseHandler(response){
        if (!response) {
            res.redirect("back");
        } 

        if (response.httpStatus == "400") {
            res.redirect("/verify?errorMessage=" + response.message);
        }

        if (response.result){
            //instantly verified
            res.redirect("/redeem?couponCode=" + response.metadata.couponCode);
        } else {
            //not verified, go to asset upload
            sheerid.getAssetToken(response.requestId, assetTokenResponseHandler);
        }
    }
    sheerid.verify(req.body, verificationResponseHandler);
});

router.get("/redeem", function(req, res) {
    res.render("redeem", {couponCode: req.query.couponCode});
});

router.get("/upload", function(req, res) {
    res.render("upload", {assetToken: req.query.assetToken, reason: req.query.reason});
});

router.post("/upload", function(req, res){
    if (!req.files) {
        return res.status(400).send("No file was uploaded");
    }

    function assetReviewResponseHandler(response) {
        console.log(response);
        console.log("printed from assetReviewResponseHandler");
        res.redirect("/");
    } 
    
    sheerid.reviewAsset(req.body.assetToken, req.files.asset, assetReviewResponseHandler);
});

module.exports = router;
