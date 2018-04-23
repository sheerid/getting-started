const sheerid           = require("../sheerid"),
      request           = require("request"),
      bodyParser        = require("body-parser"),
      express           = require("express"),
      router            = express.Router();


router.get("/", function(req, res){
    res.render("landing"); 
});

router.get("/offers", function(req, res){
    res.render("offers"); 
});

router.get("/verify", function(req, res){
    res.render("verify", { errorMessage: req.query.errorMessage });
});

router.post("/verify", bodyParser.urlencoded({ extended: false }), function(req, res){
    function verificationResponseHandler(response){
        if (!response) {
            return res.redirect("back");
        } 

        if (response.httpStatus == "400") {
            return res.redirect("/verify?errorMessage=" + response.message);
        }

        if (response.result){
            //instantly verified
            return res.redirect("/redeem?couponCode=" + response.metadata.couponCode);
        } else {
            //not verified, go to asset upload
            errs = JSON.stringify(response.errors);
            return res.redirect("/upload?requestId=" + response.requestId + "&errors=" + errs);
        }
    }
    sheerid.verify(req.body, verificationResponseHandler);
});

router.get("/redeem", function(req, res) {
    res.render("redeem", {couponCode: req.query.couponCode});
});

router.get("/upload", function(req, res) {
    var totalerrs = [];
    if (req.query.errors){
        totalerrs = totalerrs.concat(JSON.parse(req.query.errors));
    }
    if (req.query.error){
        var new_error = {
            code: req.query.error,
            message: sheerid.ErrorMessageStrings[req.query.error],
            propertyName: null
        }
        totalerrs.push(new_error);
    }

    function assetTokenResponseHandler(response) {
        if (response && response.token) {
            var info = {
                requestId: req.query.requestId,
                assetToken: response.token,
                errors: totalerrs,
            };
            res.render("upload", info);
        } else {
            return res.redirect("back");
        }
    }
    sheerid.getAssetToken(req.query.requestId, assetTokenResponseHandler);
});

router.get("/pending", function(req, res) {
    res.render("pending");
});

router.post("/notify", bodyParser.raw({ type: "application/x-www-form-urlencoded"}), function(req, res) {
    function signatureVerifyHandler(isValid) {
        if (isValid) {
            res.send("this is a message for sheerid");
        } else {
            res.send("this is a message for bad people");
        }
    }

    sheerid.verifySignature(req.body, req.headers["x-sheerid-signature"], signatureVerifyHandler);
});

module.exports = router;
