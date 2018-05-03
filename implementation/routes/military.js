const sheerid                   = require("../sheerid"),
      bodyParser                = require("body-parser"),
      express                   = require("express"),
      VerificationRequest       = require("../models/verificationRequest"),
      router                    = express.Router();

router.get("/verify", function(req, res) {
    var queryParams = {
        errorMessage: req.query.errorMessage,
    };
    res.render("affiliations/military/verify", queryParams);
});

router.post("/verify", bodyParser.urlencoded({ extended: false }), function(req, res){
    req.body.templateId = sheerid.templateIDs["military"];
    
    //we only gather discharge year but api call expects real date format
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
            //look up the data we saved about this request in our db
            VerificationRequest.find({ requestId: req.query.requestId }, function(err, verificationRequest) {
                if (err) {
                    console.log("There was an error retrieving the request information from our db");
                    res.redirect("back");
                } else {
                    //db.find returns an array of all results, but we will only ever get one hit
                    verificationRequest = verificationRequest[0];

                    //prepare an object which the upload page will render visually
                    var renderInfo = {
                        requestId: req.query.requestId,
                        assetToken: tokenResponse.token,
                        error: req.query.error ? sheerid.errorMessageStrings[req.query.error] : null,
                        firstName: verificationRequest.firstName,
                        lastName: verificationRequest.lastName,
                        organizationName: verificationRequest.organizationName,
                        affiliationType: sheerid.readableMilitaryAffiliations[verificationRequest.affiliationType],
                        exampleDocument: sheerid.exampleDocuments[verificationRequest.affiliationType],
                        formType: "military"
                    };

                    res.render("affiliations/military/upload", renderInfo);
                }
            }); 
        } else { //we didn't get a tokenResponse
           return res.redirect("back");
        }
    });
});

module.exports = router;
