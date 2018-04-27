const sheerid           = require("../sheerid"),
      request           = require("request"),
      bodyParser        = require("body-parser"),
      express           = require("express"),
      router            = express.Router();


router.get("/", function(req, res){
    res.render("landing"); 
});

router.get("/index", function(req, res) {
    res.render("index");
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

    sheerid.getAssetToken(req.query.requestId, function(tokenResponse) {
        if (tokenResponse) {
            sheerid.getRequestInfo(req.query.requestId, function(requestInfo) {
                if (requestInfo) {
                    var renderInfo = {
                        requestId: req.query.requestId,
                        assetToken: tokenResponse.token,
                        errors: totalerrs,
                        firstName: requestInfo.firstName,
                        lastName: requestInfo.lastName,
                        organizationName: requestInfo.organizationName
                    };
                    res.render("upload", renderInfo);
                } else {
                    res.redirect("back");
                }
            });
        } else {
           return res.redirect("back");
        }
    });
});

router.get("/pending", function(req, res) {
    res.render("pending");
});

router.post("/notify", bodyParser.raw({ type: "application/x-www-form-urlencoded"}), function(req, res) {

    //since we got the raw body for hashing purpose, get the requestId manually
    var requestId;
    function getRequestId(rawBody) {
            rawBody.toString().split("&").forEach(function(pair) {
            var data = pair.split("=");
            var key = data[0];
            var value = data[1];
            if (key === "requestId") {
                requestId = value;
            }
        });
    }

    getRequestId(req.body);

    sheerid.verifySignature(req.body, req.headers["x-sheerid-signature"], function(isValid) {
        if (isValid) {
            sheerid.fireEmailNotifier(requestId);
            res.status(200).send("Notifier received");
        } else {
            res.status(401).send("Unauthorized request");
        }
    });
});


module.exports = router;
