const sheerid           = require("../sheerid"),
      express           = require("express"),
      bodyParser        = require("body-parser"),
      router            = express.Router();

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/offers", function(req, res){
    res.render("offers"); 
});

router.get("/verify-landing", function(req, res){
    res.render("verify-landing");
});

router.get("/redeem", function(req, res) {
    res.render("redeem", {couponCode: req.query.couponCode});
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
            sheerid.getTemplateId(requestId, function(templateId) {
                sheerid.fireEmailNotifier(requestId, sheerid.emailNotifierIDs[templateId]);
                res.status(200).send("Notifier received");
            });
        } else {
            res.status(401).send("Unauthorized request");
        }
    });
});

module.exports = router;
