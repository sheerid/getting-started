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
    console.log(options);
    request(options, function(err, response, body){
        console.log(body);
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

exports.getTemplateId = function(requestId, callback) {
    var options = {
        url: exports.getBaseUrl() + "/verification/" + requestId,
        method: "GET",
        json: true,
        headers: {
            "Authorization": "Bearer " + process.env.APITOKEN
        }
    };

    request(request, function(err, response, body) {
        callback(body.request.metadata.templateId);
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

exports.templateIDs = {
    student: "5ad783da7584b813e77c4a6b",
    teacher: "5ae77176bed24413576f96ed",
    military: "5ae7a3329cd7d013a884d5a5",
    firstresponder: "5ae788ae9cd7d013a884915f"
}

exports.emailNotifierIDs = {};
exports.emailNotifierIDs[exports.templateIDs.student] = "5ade5d1e660f0114969bd855";
exports.emailNotifierIDs[exports.templateIDs.teacher] = "5ae778a0bed24413576fddd1";
exports.emailNotifierIDs[exports.templateIDs.military] = "5ae7a34e9cd7d013a884d5eb";
exports.emailNotifierIDs[exports.templateIDs.firstresponder] = "5ae78a259cd7d013a88494fb";
