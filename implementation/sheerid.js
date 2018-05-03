const   request                 = require("request"),
        crypto                  = require("crypto"),
        VerificationRequest     = require("./models/verificationRequest");

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

    console.log("options is");
    console.log(options);
    request(options, function(err, response, body) {
        //persist the verification request information in our db for later reference
        VerificationRequest.create({
            firstName: person.FIRST_NAME,
            lastName: person.LAST_NAME,
            email: person.EMAIL,
            organizationName: person.organizationName,
            requestId: body.requestId,
            templateId: person.templateId,
            affiliationType: person.AFFILIATION_TYPE
        }, function(err, verificationRequest) {
            if (err) {
                console.log("There was an error saving the verification request in our db...");
                console.log(err);
                callback(null);
            } else {
                callback(body);
            }
        });
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
    400: "Either no files have been supplied or at least one file is larger than the maximum upload size",
    401: "The asset token supplied is invalid, expired or has already been used to perform an upload",
    403: "The request state does not allow upload",
    415: "At least one file is an unsupported MIME type"
}

exports.readableFirstResponderAffiliations = {
    "EMT": "EMT",
    "POLICE": "Police",
    "FIREFIGHTER": "Firefighter"
}

exports.readableMilitaryAffiliations = {
    "MILITARY_RETIREE": "Military Retiree",
    "RESERVIST": "Reservist or Guard",
    "MILITARY_FAMILY": "Military Family Member",
    "ACTIVE_DUTY": "Active Duty",
    "VETERAN": "Veteran"
}

exports.exampleDocuments = {
    "ACTIVE_DUTY": "Active Duty: Any document that proves you are currently serving under Title 10 Active Duty Orders for 30 days or more.",
    "RESERVIST": "Reservist: Any document that proves you are currently serving under Title 32 Active Duty Orders for 30 days or more.",
    "MILITARY_RETIREE": "Military Retiree: Any document that proves you are a Retiree from the US Armed Forces, Disabled Veteran with a rating of 30% or higher, or a registered Military Dependent.",
    "MILITARY_FAMILY": "Military Family: Any document that proves you are a registered Military Dependent.",
    "VETERAN": "Veteran: Any document that proves you met the qualifications of military service and were honorably discharged.",
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
