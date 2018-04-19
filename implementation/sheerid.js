var exports = module.exports = {};
const request = require('request')

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

exports.reviewAssets = function(assetToken, assets, callback) {
    var options = {
        url: exports.getBaseUrl() + "/asset",
        method: "POST",
        json: true,
        form: {
            token: assetToken,
            file: assets,
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

exports.getAssetToken = function(requestId, callback) {
    var options = {
        url: exports.getBaseUrl() + "/asset/token",
        method: "POST",
        json: true,
        form: { requestId: requestId },
        headers: {
            "Authorization": "Bearer " + exports.getToken()
        }
    };
    request(options, function(err, response, body){
        callback(body);
    });
}
