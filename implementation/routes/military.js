const sheerid           = require("../sheerid"),
      bodyParser        = require("body-parser"),
      express           = require("express"),
      router            = express.Router();

router.get("/verify", function(req, res) {
    var queryParams = {
        errorMessage: req.query.errorMessage,
    };
    res.render("affiliations/military/verify", queryParams);
});

router.post("/verify", bodyParser.urlencoded({ extended: false }), function(req, res){
    req.body.templateId = sheerid.templateIDs["military"];
    req.body._affiliationTypes = [ req.body.AFFILIATION_TYPE ];
    if (req.body.STATUS_START_DATE.length > 0) {
        req.body.STATUS_START_DATE += "-01-01";
    }

    sheerid.verify(req.body, function(response) {
        if (!response) {
            return res.redirect("back");
        } 

        if (response.httpStatus == "400") {
            return res.redirect("/military/verify?errorMessage=" + response.message);
        }

        if (response.result){
            //instantly verified
            return res.redirect("/redeem?couponCode=" + response.metadata.couponCode);
        } else {
            //not verified, go to asset upload
            return res.redirect("/military/upload?requestId=" + response.requestId);
        }
    });
});

router.get("/upload", function(req, res) {
    sheerid.getAssetToken(req.query.requestId, function(tokenResponse) {
        if (tokenResponse) {
            sheerid.getRequestInfo(req.query.requestId, function(requestInfo) {
                if (requestInfo) {
                    var renderInfo = {
                        requestId: req.query.requestId,
                        assetToken: tokenResponse.token,
                        error: req.query.error ? sheerid.errorMessageStrings[req.query.error] : null,
                        firstName: requestInfo.firstName,
                        lastName: requestInfo.lastName,
                        organizationName: requestInfo.organizationName,
                        affiliationType: sheerid.readableMilitaryAffiliations[requestInfo.affiliationType],
                        exampleDocument: sheerid.exampleDocuments[requestInfo.affiliationType]
                    };
                    res.render("affiliations/military/upload", renderInfo);
                } else {
                    res.redirect("back");
                }
            });
        } else {
           return res.redirect("back");
        }
    });
});

module.exports = router;
