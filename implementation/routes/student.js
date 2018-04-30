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
            errs = JSON.stringify(response.errors);
            return res.redirect("/student/upload?requestId=" + response.requestId + "&errors=" + errs);
        }
    });
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
