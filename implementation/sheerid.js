const   request         = require("request"),
        crypto          = require("crypto");

var exports = module.exports = {};

exports.getBaseUrl = function() {
    return "https://services-sandbox.sheerid.com/rest/0.5";
}

exports.verify = function(person, callback) {
    var options = {
        url: exports.getBaseUrl() + "/verification",
        method: "POST",
        json: true,
        form: person,
        headers: {
            "Authorization": "Bearer " + process.env.APITOKEN
        }
    };

    request(options, function(err, response, body){
        callback(body);
    });
}

exports.getAssetToken = function(requestId, callback) {
    var options = {
        url: exports.getBaseUrl() + "/asset/token",
        method: "POST",
        json: true,
        form: { requestId: requestId },
        headers: {
            "Authorization": "Bearer " + process.env.APITOKEN
        }
    };

    request(options, function(err, response, body){
        callback(body);
    });
}

exports.getRequestInfo = function(requestId, callback) {

    //TODO: Get this info from db, not from api call
    //TODO: Parameterize this for different affiliation types

    var inquireRequest = {
        url: exports.getBaseUrl() + "/verification/" + requestId,
        method: "GET",
        json: true,
        headers: {
            "Authorization": "Bearer " + process.env.APITOKEN
        }
    };

    var personRequest = {
        url: exports.getBaseUrl() + "/verification/" + requestId + "/person",
        method: "GET",
        json: true,
        headers: {
            "Authorization": "Bearer " + process.env.APITOKEN
        }
    };

    request(inquireRequest, function(err, response, inquireBody) {
        request(personRequest, function(err, response, personBody) {
            var requestInfo = {
                organizationName: inquireBody.request.organization.name,
                firstName: personBody.fields.FIRST_NAME,
                lastName: personBody.fields.LAST_NAME
            };
            callback(requestInfo);
        });
    });
}

exports.getAffiliationType = function(requestId, callback) {
    var request = {
        url: exports.getBaseUrl() + "/verification/" + requestId,
        method: "GET",
        json: true,
        headers: {
            "Authorization": "Bearer " + process.env.APITOKEN
        }
    };

    request(request, function(err, response, body) {
        callback(body.request.affiliationTypes[0]);
    });
}

exports.verifySignature = function(rawBody, signature, callback) {
    var hmac = crypto.createHmac("sha256", process.env.SECRETTOKEN);
    hmac.update(rawBody);
    callback(hmac.digest("hex") === signature);
}

exports.fireEmailNotifier = function(requestId, notifierId) {
    var options = {
        url: exports.getBaseUrl() + "/notifier/" + notifierId + "/fire",
        method: "POST",
        json: true,
        form: { 
            requestId: requestId,
            eventType: "ASYNCHRONOUS_UPDATE" 
        },
        headers: {
            "Authorization": "Bearer " + process.env.APITOKEN
        }
    };

    request(options, function(err, res, body){});
}

exports.errorMessageStrings = {
    400: "either no files have been supplied or at least one file is larger than the maximum upload size",
    401: "the asset token supplied is invalid, expired or has already been used to perform an upload",
    403: "the request state does not allow upload",
    415: "at least one file is an unsupported MIME type"
}

exports.emailNotifierIDs = {
    "STUDENT": "5ade5d1e660f0114969bd855",
    "FACULTY": "5ae778a0bed24413576fddd1",
    "MILITARY": "5ade5d1e660f0114969bd855", //TODO FIXME
    "FIRST_RESPONDER": "5ade5d1e660f0114969bd855" //TODO FIXME
}
