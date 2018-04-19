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
    res.render("verify");
});

router.post("/verify", function(req, res){
    function assetTokenResponseHandler(response) {
        if (response && response.token) {
            res.redirect("/upload?assetToken=" + response.token);
        } else {
            res.redirect("back");
        }
    }

    function verificationResponseHandler(response){
        if (!response) {
            res.redirect("back");
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
    res.render("upload", {assetToken: req.query.assetToken});
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
    
    var assets = { file0: req.files.asset.data };
    
    sheerid.reviewAssets(req.body.assetToken, assets, assetReviewResponseHandler);
});

module.exports = router;
