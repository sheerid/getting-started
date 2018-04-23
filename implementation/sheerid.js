var exports = module.exports = {};
const request = require('request');

exports.getApiToken = function() {
    return process.env.APITOKEN;
}
exports.getSecretToken = function() {
    return process.env.SECRETTOKEN;
}
exports.getTemplateId = function(){
    return process.env.TEMPLATEID;
}

exports.getBaseUrl = function() {
    return "https://services-sandbox.sheerid.com/rest/0.5";
}

exports.verify = function(person, callback) {
    person.templateId = exports.getTemplateId(); //add the template id to the information passed to verify API call

    var options = {
        url: exports.getBaseUrl() + "/verification",
        method: "POST",
        json: true,
        form: person,
        headers: {
            "Authorization": "Bearer " + exports.getApiToken()
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
            "Authorization": "Bearer " + exports.getApiToken()
        }
    };

    request(options, function(err, response, body){
        callback(body);
    });
}

const ErrorMessageStrings = {

}
exports.getErrorMessage = function(errorCode){
    switch (errorCode) {
        case 400:
            
    }
    if (errorCode == 400 || errorCode == "400") {
        return "either no files have been supplied or at least one file is larger than the maximum upload size";
    } else if (errorCode == 401 || errorCode == "401") {
        return "the asset token supplied is invalid, expired or has already been used to perform an upload";
    } else if (errorCode == 403 || errorCode == "403") {
        return "the request state does not allow upload";
    } else if (errorCode == 415 || errorCode == "415") {
        return "at least one file is an unsupported MIME type";
    } else {
        return "unknown";
    }
}
