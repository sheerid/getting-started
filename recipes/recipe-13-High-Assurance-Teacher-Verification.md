# SheerID API Recipes

# High-Assurance Teacher Verification

This template demonstrates a "High Assurance" teacher verification that requires a match on all 3 of first name, last name and email provided with the request. This differs from the default which will match on either of first + last name OR email address.

````
# Template Name: Teacher High Assurance
# Template ID: 57d6c5f6e4b083fa7207259f
#
#   active: true
#   expires: null
#   config.affiliationTypes: ["FACULTY"]
#   config.assetTypes: ["CLASS_SCHEDULE", "DATED_ID_CARD", "ID_CARD", "OFFICIAL_LETTER", "OTHER", "PAY_STUB"]
#   config.consolationRewardIds: []
#   config.locale: "en_us"
#   config.metadata: {"assuranceLevel": "HIGH", "maxAssetReviews": "3"}
#   config.notifierIds: ["57d6c5f6e4b083fa720725a4"]
#   config.rewardIds: []
#   config.verificationTypes: ["ASSET_REVIEW", "AUTHORITATIVE"]


[bundle-messages]


[isAffiliationTypeSelected]
true

[isIncomplete]
true

[parent]
named:teacherpromotion

[requiredOrganizationParameters]
name
````

A true result is only returned if both email and name match.
A false result will also include 1 or more VerificationError codes in the API response that indicates why the verification failed.

Here is an example of a SUCCESSFUL request using the above template. Note the "result": true and "errors": []

````
$ curl -H "Authorization: Bearer $TOKEN" \
    -d _affiliationTypes=FACULTY \
    -d _assuranceLevel=HIGH \
    -d FIRST_NAME=Steve \
    -d LAST_NAME=Smith \
    -d POSTAL_CODE=01002 \
    -d EMAIL=ssmith@amherst.edu \
    https://services.sheerid.com/rest/0.5/verification
````

````

{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 0,
            "organizationName": "Amherst College",
            "start": 1382486400000,
            "type": "FACULTY",
            "updated": 1377475200000
        }
    ],
    "errors": [],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "active": false,
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "FACULTY"
            ],
            "assetTypes": [
                "CLASS_SCHEDULE",
                "OTHER",
                "OFFICIAL_LETTER",
                "ID_CARD",
                "PAY_STUB",
                "DATED_ID_CARD"
            ],
            "consolationRewardIds": [],
            "locale": "en_US",
            "metadata": {
                "assuranceLevel": "HIGH"
            },
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "AUTHORITATIVE",
                "ASSET_REVIEW"
            ]
        },
        "expirationDate": 1475530675044,
        "metadata": {},
        "organization": null,
        "personId": "57e9916ae4b045fd037df91d",
        "revisions": 1,
        "timestamp": 1474925875044,
        "userId": "57e989e9e4b07718572c353f"
    },
    "requestId": "57e99533e4b02cb22b74d56d",
    "result": true,
    "status": "COMPLETE",
    "timestamp": 1474925875307
}

````

Here is an example of a UNSUCCESSFUL request using the above template. Notice I changed the first name to Bill which now gives us a "result": false. Notice the following errors:
    - "FIRST NAME NOT VERIFIED"
    - "LAST NAME NOT VERIFIED"

````
$ curl -H "Authorization: Bearer $TOKEN" \
    -d _affiliationTypes=FACULTY \
    -d _assuranceLevel=HIGH \
    -d FIRST_NAME=Bill \
    -d LAST_NAME=Smith \
    -d POSTAL_CODE=01002 \
    -d EMAIL=ssmith@amherst.edu \
    https://services.sheerid.com/rest/0.5/verification
````

````

{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 0,
            "organizationName": "Amherst College",
            "start": 1382486400000,
            "type": "FACULTY",
            "updated": 1377475200000
        }
    ],
    "errors": [
        {
            "code": 51,
            "message": "FIRST NAME NOT VERIFIED",
            "propertyName": "FIRST_NAME"
        },
        {
            "code": 51,
            "message": "LAST NAME NOT VERIFIED",
            "propertyName": "LAST_NAME"
        }
    ],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "active": true,
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "FACULTY"
            ],
            "assetTypes": [
                "OFFICIAL_LETTER",
                "ID_CARD",
                "PAY_STUB",
                "DATED_ID_CARD",
                "OTHER",
                "CLASS_SCHEDULE"
            ],
            "consolationRewardIds": [],
            "locale": "en_US",
            "metadata": {
                "assuranceLevel": "HIGH"
            },
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "AUTHORITATIVE",
                "ASSET_REVIEW"
            ]
        },
        "expirationDate": 1475530880703,
        "metadata": {},
        "organization": null,
        "personId": "57e99600e4b045fd037e05b7",
        "revisions": 1,
        "timestamp": 1474926080703,
        "userId": "57e989e9e4b07718572c353f"
    },
    "requestId": "57e99600e4b045fd037e05b8",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1474926080941
}

````

Here is an example of a UNSUCCESSFUL request using the above template. Notice I changed the email address to "smith@amherst.edu" from "ssmith@amherst.edu". Notice the "result": false and the following errors:
    - "EMAIL NOT VERIFIED"

````
$ curl -H "Authorization: Bearer $TOKEN" \
    -d _affiliationTypes=FACULTY \
    -d _assuranceLevel=HIGH \
    -d FIRST_NAME=Steve \
    -d LAST_NAME=Smith \
    -d POSTAL_CODE=01002 \
    -d EMAIL=smith@amherst.edu \
    https://services.sheerid.com/rest/0.5/verification
````

````

{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 0,
            "organizationName": "Amherst College",
            "start": 1382486400000,
            "type": "FACULTY",
            "updated": 1377475200000
        }
    ],
    "errors": [
        {
            "code": 51,
            "message": "EMAIL NOT VERIFIED",
            "propertyName": "EMAIL"
        }
    ],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "active": true,
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "FACULTY"
            ],
            "assetTypes": [
                "DATED_ID_CARD",
                "CLASS_SCHEDULE",
                "ID_CARD",
                "OTHER",
                "PAY_STUB",
                "OFFICIAL_LETTER"
            ],
            "consolationRewardIds": [],
            "locale": "en_US",
            "metadata": {
                "assuranceLevel": "HIGH"
            },
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "AUTHORITATIVE",
                "ASSET_REVIEW"
            ]
        },
        "expirationDate": 1475531273156,
        "metadata": {},
        "organization": null,
        "personId": "57e9916ae4b045fd037df91d",
        "revisions": 1,
        "timestamp": 1474926473156,
        "userId": "57e989e9e4b07718572c353f"
    },
    "requestId": "57e99789e4b07718572c5ef3",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1474926473397
}

````

Here is an example of a UNSUCCESSFUL request using the above template. Notice I changed the email address domain to "ssmith@amher.edu" from "ssmith@amherst.edu". Notice the "result": false and the following errors:
    - "EMAIL NOT VERIFIED"
    - "DOMAIN NOT VERIFIED"

````
$ curl -H "Authorization: Bearer $TOKEN" \
    -d _affiliationTypes=FACULTY \
    -d _assuranceLevel=HIGH \
    -d FIRST_NAME=Brian \
    -d LAST_NAME=Smith \
    -d POSTAL_CODE=01002 \
    -d EMAIL=ssmith@amherst.edu \
    https://services.sheerid.com/rest/0.5/verification
````

````

{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 0,
            "organizationName": "Amherst College",
            "start": 1382486400000,
            "type": "FACULTY",
            "updated": 1377475200000
        }
    ],
    "errors": [
        {
            "code": 51,
            "message": "EMAIL NOT VERIFIED",
            "propertyName": "EMAIL"
        },
        {
            "code": 51,
            "message": "DOMAIN NOT VERIFIED",
            "propertyName": "EMAIL.domain"
        }
    ],
    "inactiveAffiliations": [],
    "metadata": {},
    "request": {
        "active": true,
        "assetMap": {},
        "config": {
            "affiliationTypes": [
                "FACULTY"
            ],
            "assetTypes": [
                "CLASS_SCHEDULE",
                "OTHER",
                "OFFICIAL_LETTER",
                "ID_CARD",
                "PAY_STUB",
                "DATED_ID_CARD"
            ],
            "consolationRewardIds": [],
            "locale": "en_US",
            "metadata": {
                "assuranceLevel": "HIGH"
            },
            "notifierIds": null,
            "rewardIds": [],
            "verificationTypes": [
                "AUTHORITATIVE",
                "ASSET_REVIEW"
            ]
        },
        "expirationDate": 1475531585830,
        "metadata": {},
        "organization": null,
        "personId": "57e9916ae4b045fd037df91d",
        "revisions": 1,
        "timestamp": 1474926785830,
        "userId": "57e989e9e4b07718572c353f"
    },
    "requestId": "57e998c1e4b02cb22b74e1ed",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1474926786232
}

````


