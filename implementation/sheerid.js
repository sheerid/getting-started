var exports = module.exports = {};
const request = require('request')

exports.getToken = function() {
    return process.env.TOKEN;
}
exports.getTemplateId = function(){
    return process.env.TEMPLATEID;
}

exports.verifyIdentity = function(identity, callback) {
    identity.templateId = exports.getTemplateId(); //add the template id to the information passed to verify API call
    var options = {
        url: "https://services-sandbox.sheerid.com/rest/0.5/verification",
        method: "POST",
        json: true,
        form: identity,
        headers: {
            "Authorization": "Bearer " + exports.getToken()
        }
    };
    request(options, function(err, response, body){
        console.log(body);
        callback(body);
    });
}
