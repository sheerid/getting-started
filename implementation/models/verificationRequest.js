var mongoose = require("mongoose");

var verificationRequestSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    requestId: String,
    templateId: String,
    affiliationType: String,
    organizationName: String
});

module.exports = mongoose.model("VerificationRequest", verificationRequestSchema);
