![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Using Redemption Tokens with a SheerID-hosted Verify App
--------------------------------------------------------

Redemption Token processing is one of the strategies available for receiving verified users from SheerID, and restricting the benefits of that verification event to a single use, for example a one-time discount or program registration for a single end-user. This token may also serve as a way to validate referral traffic from a SheerID hosted Verify App.

### Steps

The subsequent examples demonstrate the use a SheerID-hosted template that was created by following the steps outlined in Appendix A, shown below.

#### Perform a succcessful verification through a SheerID-hosted Verify App:


 1. User is directed at the [Verify App template URL](https://services-sandbox.sheerid.com/verify/5603f747e4b0ec5b8081efa9/). This could be via a direct link or embedded in an iframe/lightbox.
 2. User enters sufficient information to successfully verify instantly or by uploading documentation for review. In this example, we use the Sandbox environment which allows testing via [specific test data rules](http://developer.sheerid.com/sandbox-source.html).

#### Redirection

Upon success, our template is set up to redirect verified users back to the integrator's redemption URL: `http://example.com/redeem`. Each successful verification will also contain a unique single-use token that can be validated and revoked with the SheerID REST API.

One such redirect URL generated is as follows:

    http://example.com/redeem?redemptionToken=M6uyIBx&sheerid_salt=0d9b001482df39ed5fb718e48c136ba1647695e66718bc4a317b23ed2b00fbbd&sheerid_security=ef81c53d251fe9e827d39e0351a3ebd324c1c8e421b1d80a699128ae571a57cc

As you can see, there is a redemption token present in the query string: `M6uyIBx`. There are also 2 additional parameters supplied, `sheerid_salt` and `sheerid_security` that can be used to authenticate the redirect URL. More details on that optional step can be found in a separate recipe, [Recipe: Validate Success URL](recipe-07-validate-success-url.md).

#### Validation

In order to check the validity of the supplied token, integrators should use the [Check Token](http://developer.sheerid.com/docs/token/checkToken.html) REST resource to confirm the token is valid. Integrations should require a valid redemption token in order to grant access to the protected resource (coupon/offer, program registration, etc).

A redemption token may be invalid for a few reasons:

 * It is expired (default lifetime is 90 days, this value is configurable)
 * It has already been redeemed
 * A user is trying to manipulate the system by suppling a fraudulent token

If the token is valid, this resource will return a `200 OK` HTTP status code and a JSON response containing the token and its expiration as a unix timestamp (milliseconds):

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/token/redemption/M6uyIBx | python -mjson.tool
{
    "expires": 1450876523574,
    "token": "M6uyIBx"
}
````

Compare to the following result when attempting to check an invalid token:

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/token/redemption/M47e4DM | python -mjson.tool
{
    "httpStatus": 404,
    "status": "404"
}
````

#### Redemption

*Once the user has claimed their exclusive offer*, integrators should then revoke this redemption token with [Revoke Token](http://developer.sheerid.com/docs/token/revokeToken.html) so that it cannot be used again. **NOTE:** It is important to wait until the user has completed the intended conversion event before revoking this token, rather than revoking it immediately after checking. The reason for this is that not all users will convert on their first visit, and if you revoke the token prematurely, the user won't be able to access the protected offer (many times, they will have been sent a personalized link that can be used to return at a later date), instead they will be required to go through the verification workflow again. It's ideal to revoke this token after the user has made a purchase with their discount or successfully registered for the exclusive program.


    $ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/token/M6uyIBx -X DELETE
    # Returns 204 No Content

Now that this token has been revoked, a subsequent attempt to check the token returns `404 Not Found` HTTP status:

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0hon -mjson.tooltion/M6uyIBx | pyt 
{
    "httpStatus": 404,
    "status": "404"
}
````

### Appendix A: One-time Setup Steps

The following setup steps can be performed via administrative tools in the SheerID Control Center web app. The equivalent REST API requests are demonstrated here for reference purposes.

#### Create a reward with `redemptionToken`:

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/reward -d name=RedemptionToken -d 'redemptionToken=custom_coupon:M${request.token}' | python -mjson.tool
{
    "data": {
        "redemptionToken": "custom_coupon:M${request.token}"
    },
    "id": "5603f69be4b0ec5b8081efa1",
    "name": "RedemptionToken"
}
````

#### Create a verification template and attach the previously created reward:

We create a military verification template for demonstration purposes, with a success redirect. In this example, it is supposed that the integrator is prepared to receive traffic at the success URL (`http://example.com/redeem`), and will read the redemption token from a query string parameter named `redemptionToken`.

````
$ curl -s -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/template -d name=MilitaryRecipe -d organizationType=MILITARY -d _rewardIds=5603f69be4b0ec5b8081efa1 -d 'success_url=http://example.com/redeem?redemptionToken=${redemptionToken}' | python -mjson.tool
{
    "active": true,
    "config": {
        "affiliationTypes": [
            "RESERVIST",
            "MILITARY_FAMILY",
            "MILITARY_RETIREE",
            "VETERAN",
            "ACTIVE_DUTY",
            "DISABLED_VETERAN"
        ],
        "assetTypes": [
            "OFFICIAL_LETTER",
            "DD214",
            "DATED_ID_CARD",
            "INSURANCE_CARD",
            "ID_CARD",
            "PAY_STUB",
            "OTHER"
        ],
        "consolationRewardIds": [],
        "metadata": {},
        "notifierIds": null,
        "rewardIds": [
            "5603f69be4b0ec5b8081efa1"
        ],
        "verificationTypes": [
            "AUTHORITATIVE",
            "ASSET_REVIEW"
        ]
    },
    "expires": null,
    "id": "5603f747e4b0ec5b8081efa9",
    "metadata": {
        "organizationType": "MILITARY",
        "success_url": "http://example.com/redeem?redemptionToken=${redemptionToken}"
    },
    "name": "MilitaryRecipe"
}
````

As a result of creating this template, we can now verify users via the following URL:

    https://services-sandbox.sheerid.com/verify/5603f747e4b0ec5b8081efa9/