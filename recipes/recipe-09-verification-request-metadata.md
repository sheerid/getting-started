![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Request Metadata - Store custom data with a Verification Request
----------------------------------------------------------------

When performing a verification request, it's possible to supply additional custom data that will be stored with the request, returned with the Verification Response object, and available in verification reporting. This is useful for correlating SheerID verification activities to data in your system, or otherwise segmenting/attributing SheerID verification activity.

### Include request metadata when verifying

#### Example request:

Note the POSTed `:customerId` and `:campaign` data, containing a reference to a customer number and a reference to the campaign to which this verification activity may be associated, respectively. These are simply examples of information a caller may want to track - callers can supply any key/value pairs, provided the key is prefixed by a colon character (`:`).

    curl -H "Authorization: Bearer $TOKEN" \
        -d _affiliationTypes=STUDENT_FULL_TIME,STUDENT_PART_TIME \
        -d organizationId=3425 \
        -d FIRST_NAME=Test \
        -d LAST_NAME=User \
        -d BIRTH_DATE=1992-03-20 \
        -d EMAIL=student@example.edu \
        -d :customerId=23976482513 \
        -d ":campaign=Back To School" \
        https://services-sandbox.sheerid.com/rest/0.5/verification

#### Example response:

Note that the data supplied is returned in the VerificationResponse at the following paths:

 * `request.metadata.campaign`
 * `request.metadata.customerId`

````
{
    "affiliations": [
        {
            "attributes": [],
            "end": 1450195764577,
            "organizationId": 3425,
            "organizationName": "TULANE UNIVERSITY (TU)",
            "start": 1439654964577,
            "type": "STUDENT_FULL_TIME",
            "updated": 1440864564577
        }
    ],
    "errors": [],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "STUDENT_PART_TIME",
                "STUDENT_FULL_TIME"
            ],
            "assetTypes": [
                "TRANSCRIPT",
                "OFFICIAL_LETTER",
                "TUITION_RECEIPT",
                "CLASS_SCHEDULE",
                "DATED_ID_CARD",
                "ID_CARD",
                "REGISTRATION_RECEIPT",
                "OTHER"
            ],
            "consolationRewardIds": [],
            "metadata": {},
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "AUTHORITATIVE",
                "ASSET_REVIEW"
            ]
        },
        "metadata": {
            "campaign": "Back To School",
            "customerId": "23976482513"
        },
        "organization": {
            "alias": null,
            "city": "NEW ORLEANS",
            "id": 3425,
            "name": "TULANE UNIVERSITY (TU)",
            "state": "LA",
            "street": null,
            "type": "UNIVERSITY",
            "zip": null
        },
        "personId": "554622abe4b0c5cbe05b4569",
        "timestamp": 1443111280266,
        "userId": "4f70bfcfe4b01f7e8bec652e"
    },
    "requestId": "56042170e4b0ec5b8081f25c",
    "result": true,
    "status": "COMPLETE",
    "timestamp": 1443111280276
}
````

### Updating request metadata

Let's suppose this user proceeded to make a purchase after being successfully verified. You may want to update the VerificationRequest metadata to store the order number:

#### Request:

    curl -H "Authorization: Bearer $TOKEN" \
        -d :orderId=3248293 \
        https://services-sandbox.sheerid.com/rest/0.5/verification/56042170e4b0ec5b8081f25c/metadata

#### Response:

    {
        "campaign": "Back To School",
        "customerId": "23976482513",
        "orderId": "3248293"
    }


After the update, a call to [Inquire](http://developer.sheerid.com/docs/verification/inquire.html) for this requestId shows the updated request metadata as well:

````
$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification/56042170e4b0ec5b8081f25c  | pp
{
    "affiliations": [
        {
            "attributes": [],
            "end": 1450195764577,
            "organizationId": 3425,
            "organizationName": "TULANE UNIVERSITY (TU)",
            "start": 1439654964577,
            "type": "STUDENT_FULL_TIME",
            "updated": 1440864564577
        }
    ],
    "errors": [],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "STUDENT_FULL_TIME",
                "STUDENT_PART_TIME"
            ],
            "assetTypes": [
                "ID_CARD",
                "CLASS_SCHEDULE",
                "DATED_ID_CARD",
                "OTHER",
                "OFFICIAL_LETTER",
                "REGISTRATION_RECEIPT",
                "TUITION_RECEIPT",
                "TRANSCRIPT"
            ],
            "consolationRewardIds": [],
            "metadata": {},
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "AUTHORITATIVE",
                "ASSET_REVIEW"
            ]
        },
        "metadata": {
            "campaign": "Back To School",
            "customerId": "23976482513",
            "orderId": "3248293"
        },
        "organization": {
            "alias": null,
            "city": "NEW ORLEANS",
            "id": 3425,
            "name": "TULANE UNIVERSITY (TU)",
            "state": "LA",
            "street": null,
            "type": "UNIVERSITY",
            "zip": null
        },
        "personId": "554622abe4b0c5cbe05b4569",
        "timestamp": 1443111280245,
        "userId": "4f70bfcfe4b01f7e8bec652e"
    },
    "requestId": "56042170e4b0ec5b8081f25c",
    "result": true,
    "status": "COMPLETE",
    "timestamp": 1443111280276
}
````