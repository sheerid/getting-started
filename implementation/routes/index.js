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
    res.render("verify", { errorMessage: req.query.errorMessage });
});

router.post("/verify", function(req, res){

    function verificationResponseHandler(response){
        //console.log(response);
        //response.errors.forEach(function(error){console.log(error.message); });
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
            console.log(response.errors);
            response.errors.forEach(function(error){console.log(error.message); });
            res.redirect("/upload?requestId=" + response.requestId + "errors=" + response.errors);
        }
    }
    sheerid.verify(req.body, verificationResponseHandler);
});

router.get("/redeem", function(req, res) {
    res.render("redeem", {couponCode: req.query.couponCode});
});

router.get("/upload", function(req, res) {
    console.log("in get upload, printing incoming request query string");
    req.query.errors.forEach(function (error) {console.log(error);});
    function assetTokenResponseHandler(response) {
        if (response && response.token) {
            var info = {
                assetToken: response.token,
                errors: req.query.errors
            };
            res.render("upload", info);
        } else {
            res.redirect("back");
        }
    }

    sheerid.getAssetToken(req.query.requestId, assetTokenResponseHandler);
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
