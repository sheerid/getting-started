var exports = module.exports = {};
const request = require('request');

exports.getToken = function() {
    return process.env.TOKEN;
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
            "Authorization": "Bearer " + exports.getToken()
        }
    };

    request(options, function(err, response, body){
        callback(body);
    });
}

exports.reviewAsset = function(assetToken, file, callback) {
    var options = {
        url: exports.getBaseUrl() + "/asset",
        method: "POST",
        json: true,
        form: {
            token: assetToken,
            file: file,
            mergeMultipleDocuments: true,
        },
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + exports.getToken()
        }
    };

    console.log("here is the 'options' object that was prepared in reviewAssets");
    console.log(options);

    request(options, function(err, response, body){
        callback(body);
    });   
}

exports.getAssetToken = function(info, callback) {
    var errors = info.errors;
    var options = {
        url: exports.getBaseUrl() + "/asset/token",
        method: "POST",
        json: true,
        form: { requestId: info.requestId },
        headers: {
            "Authorization": "Bearer " + exports.getToken()
        }
    };
    request(options, function(err, response, body){
        body.errors = errors;
        callback(body);
    });
}
