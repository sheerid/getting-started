const sheerid           = require("../sheerid"),
      bodyParser        = require("body-parser"),
      express           = require("express"),
      router            = express.Router();

router.get("/verify", function(req, res) {
    var queryParams = {
        errorMessage: req.query.errorMessage,
    };
    res.render("affiliations/student/verify", queryParams);
});

router.post("/verify", bodyParser.urlencoded({ extended: false }), function(req, res){
    req.body.templateId = "5ad783da7584b813e77c4a6b";

    sheerid.verify(req.body, function(response) {
        if (!response) {
            return res.redirect("back");
        } 

        if (response.httpStatus == "400") {
            return res.redirect("/student/verify?errorMessage=" + response.message);
        }

        if (response.result){
            //instantly verified
            return res.redirect("/redeem?couponCode=" + response.metadata.couponCode);
        } else {
            //not verified, go to asset upload
            return res.redirect("/student/upload?requestId=" + response.requestId);
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
                        organizationName: requestInfo.organizationName
                    };
                    res.render("affiliations/student/upload", renderInfo);
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
