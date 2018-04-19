var exports = module.exports = {};
const request = require('request')

exports.getToken = function() {
    return process.env.TOKEN;
}

exports.verifyIdentity = function(identity, callback) {
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
        console.log("hello from sheerid.js");
        console.log(body);
        callback(body);
    });
    console.log("hello sam i have completed the request");
}
