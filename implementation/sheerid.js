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
