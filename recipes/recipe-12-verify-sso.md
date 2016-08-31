# SheerID API Recipes

## Perform an international student verification with Single-Sign On

### Retrieve a list of schools in a particular country:

Using [List Organizations](http://developer.sheerid.com/docs/organization/listOrganizations.html) resource, specify the `country` query string parameter with a value set to (2-character) [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the desired country, in addition to `type=UNIVERSITY` to obtain a list of schools. Caching this list daily/weekly is a suggested performance improvement, so it need not be fetched for each user.

````
$ curl -H "Authorization: Bearer $TOKEN" "https://services-sandbox.sheerid.com/rest/0.5/organization?type=UNIVERSITY&country=GB"

[
    {
        "accountId": null,
        "alias": null,
        "city": null,
        "country": "GB",
        "emailDomains": [
            "uad.ac.uk"
        ],
        "id": 851733602,
        "ip": null,
        "name": "Abertay University",
        "state": null,
        "street": null,
        "tags": null,
        "type": "UNIVERSITY",
        "zip": null
    },
    ...
]
````

Alternatively, use the [Organization Combobox JSAPI module](http://developer.sheerid.com/jsapi.html#module-combobox) to help the user select a valid SheerID Organization with typeahead search behavior.

## Initiate a VerificationRequest

Once the student has selected an `organizationId` that matches their school, submit a verification request to initiate the workflow:

````
$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification \
  -d _verificationTypes=SSO,ASSET_REVIEW \
  -d _affiliationTypes=STUDENT_FULL_TIME \
  -d organizationId=851733602 \
  -d FIRST_NAME=Joe \
  -d LAST_NAME=Student

{
    "affiliations": [],
    "errors": [
        {
            "code": 39,
            "message": "Awaiting documentation upload",
            "propertyName": null
        }
    ],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "active": true,
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "STUDENT_FULL_TIME"
            ],
            "assetTypes": [
                "TUITION_RECEIPT",
                "REGISTRATION_RECEIPT",
                "ID_CARD",
                "OTHER",
                "CLASS_SCHEDULE",
                "OFFICIAL_LETTER",
                "TRANSCRIPT",
                "DATED_ID_CARD"
            ],
            "consolationRewardIds": [],
            "metadata": {},
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "SSO",
                "ASSET_REVIEW"
            ]
        },
        "expirationDate": 1473278684493,
        "metadata": {},
        "organization": {
            "accountId": null,
            "alias": null,
            "city": null,
            "country": "GB",
            "emailDomains": [
                "uad.ac.uk"
            ],
            "id": 851733602,
            "ip": null,
            "name": "Abertay University",
            "state": null,
            "street": null,
            "tags": null,
            "type": "UNIVERSITY",
            "zip": null
        },
        "personId": "57c72b4fe4b07cc21e880203",
        "revisions": 1,
        "timestamp": 1472673884493,
        "userId": "54638c70e4b0da7bcf220ba8"
    },
    "requestId": "57c7385ce4b027e35aed5d60",
    "result": null,
    "status": "COMPLETE",
    "timestamp": 1472673884523
}
````

At this point you will see a response with `result=null` and an error of "Awaiting document upload" which indicates the verification request is inconclusive pending further action.

### List secondary verification options

At this stage, you will want to check the verification types available for secondary verification, in order to determine how to proceed. It is possible that the school selected may not support the SSO option, in which case the user can proceed directly to document upload.

````
$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verificationType/57c7385ce4b027e35aed5d60

[
    {
        "data": {
            "url": "https://services-sandbox.sheerid.com/rest/0.5/verification/sso/57c7385ce4b027e35aed5d60"
        },
        "type": "SSO"
    },
    {
        "data": {
            "uploadToken": {
                "expires": 1472677647604,
                "token": "fb7e0ce0427b47ab898abf8b79f52289"
            },
            "url": "https://services-sandbox.sheerid.com/upload/?token=fb7e0ce0427b47ab898abf8b79f52289"
        },
        "type": "ASSET_REVIEW"
    }
]
````

The response above indicates that there are 2 options (Verification Types) that can be used to proceed at this point, `SSO` (single sign on with university credentials) and `ASSET_REVIEW` (prompt the user to upload a document for review).

### Direct user at SSO

To enable SSO, direct the user at the `url` provided in the previous response. It is important that this page is not embedded in an iframe of any kind, as many of the university identity providers disallow hosting their page within an iframe for security reasons.

https://services-sandbox.sheerid.com/rest/0.5/verification/sso/57c7385ce4b027e35aed5d60

This URL will redirect the user to their university identity provider login page for authentication. Upon successful login, the user will be redirected back to SheerID and a confirmation message is displayed.

### Await response

Once the user follows the link above, the VerificationResponse enters `PENDING` status, as indicated in the following call to [Inquire](http://developer.sheerid.com/docs/verification/inquire.html) resource.

````
$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification/57c7385ce4b027e35aed5d60 

{
    "affiliations": [],
    "errors": [],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "active": true,
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "STUDENT_FULL_TIME"
            ],
            "assetTypes": [
                "TUITION_RECEIPT",
                "REGISTRATION_RECEIPT",
                "OTHER",
                "ID_CARD",
                "CLASS_SCHEDULE",
                "OFFICIAL_LETTER",
                "TRANSCRIPT",
                "DATED_ID_CARD"
            ],
            "consolationRewardIds": [],
            "metadata": {},
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "SSO",
                "ASSET_REVIEW"
            ]
        },
        "expirationDate": 1473278684493,
        "metadata": {},
        "organization": {
            "accountId": null,
            "alias": null,
            "city": null,
            "country": "US",
            "emailDomains": null,
            "id": 851733602,
            "ip": null,
            "name": "Abertay University",
            "state": null,
            "street": null,
            "tags": null,
            "type": "UNIVERSITY",
            "zip": null
        },
        "personId": "57c72b4fe4b07cc21e880203",
        "revisions": 1,
        "timestamp": 1472673884493,
        "userId": "54638c70e4b0da7bcf220ba8"
    },
    "requestId": "57c7385ce4b027e35aed5d60",
    "result": null,
    "status": "PENDING",
    "timestamp": 1472674537722
}
````

The authentication should only take a few seconds/minutes as the user is entering their credentials. The ideal setup would be to use a HTTP Notifier as described in [Recipe 4: Notifiers](recipe-04-notifiers.md) to listen for changes to this response and handle the results accordingly. API integrators may also repeat the Inquire call shown above (polling) until the status is no longer `PENDING`.

If for whatever reason, the authentication is taking longer than anticipated to complete or the user indicates that they cannot log in with their credentials, the SSO verification can be canceled with the following `DELETE` request:

````
$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification/sso/57c7385ce4b027e35aed5d60 -X DELETE

(successful cancellation results in 204 No Content http status code)
````

### Completed SSO verification

Upon completion of the SSO step by the user, an inquiry will show `status` property as `COMPLETE` and the `result` property as `true` or `false`. A `false` result is shown below.

$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification/57c7385ce4b027e35aed5d60

{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 851733788,
            "organizationName": "Writtle College",
            "start": null,
            "type": "FACULTY",
            "updated": 1472670660891
        }
    ],
    "errors": [],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "active": true,
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "STUDENT_FULL_TIME"
            ],
            "assetTypes": [
                "OFFICIAL_LETTER",
                "OTHER",
                "REGISTRATION_RECEIPT",
                "TUITION_RECEIPT",
                "ID_CARD",
                "DATED_ID_CARD",
                "TRANSCRIPT",
                "CLASS_SCHEDULE"
            ],
            "consolationRewardIds": [],
            "metadata": {},
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "SSO",
                "ASSET_REVIEW"
            ]
        },
        "expirationDate": 1473275373509,
        "metadata": {},
        "organization": {
            "accountId": null,
            "alias": null,
            "city": null,
            "country": "US",
            "emailDomains": null,
            "id": 851733788,
            "ip": null,
            "name": "Writtle College",
            "state": null,
            "street": null,
            "tags": null,
            "type": "UNIVERSITY",
            "zip": null
        },
        "personId": "57c72b4fe4b07cc21e880203",
        "revisions": 1,
        "timestamp": 1472670573509,
        "userId": "54638c70e4b0da7bcf220ba8"
    },
    "requestId": "57c72b6de4b07cc21e88020c",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1472670660897
}

### Upload a document for review

If (as shown above), the `result` is not equal to `true` after attempting SSO (or if SSO is canceled), the user may be prompteed to upload a document for review, which works the same way as it does for US institutions. The process can be continued as described in [Recipe 2: Student Asset Upload](recipe-02-verify-student-asset-upload.md#request-upload-token), beginning with the "Request upload token" step, taking care to use the existing `requestId` from the current verification request (`57c7385ce4b027e35aed5d60`).

You will also note that the list of available verification types from earlier included `ASSET_REVIEW`. This response contains a `token` property containing a token value that can be used directly to bypass the token issuance step, skipping directly to [Use token to upload image asset](recipe-02-verify-student-asset-upload.md#use-token-to-upload-image-asset).

Furthermore, integrators that do not require a customized document review experience can send the user directly to the URL specified in the `url` property of the `ASSET_REVIEW` section of the secondary verification types response.

As with SSO verification, the ideal way to monitor changes in the state of VerificationRequests submitted (including results/feedback on documents uplodaded and reviewed) is with the use of HTTP Notifiers as described in [Recipe 4: Notifiers](recipe-04-notifiers.md).