![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Perform a verification on an employee, successful response
------------------------------------

Example call:

    curl -H "Authorization: Bearer $TOKEN" \
        -d organizationId=142778 \
        -d _affiliationTypes=EMPLOYEE \
        -d FIRST_NAME=test \
        -d LAST_NAME=employee \
        -d ADDRESS1="123 main st" \
        -d CITY=Beaverton \
        -d STATE=OR \
        -d POSTAL_CODE=97008 \
        -d :opt-in="By submitting information through this form, you authorize and instruct us to obtain and use information on you, including consumer reports from third parties, for purposes of verifying your eligibility for this program."
        https://services-sandbox.sheerid.com/rest/0.5/verification

Example successful response:

    {
        "affiliations": [
            {
                "attributes": [],
                "end": null,
                "organizationId": 142778,
                "organizationName": "NIKE, Inc.",
                "start": null,
                "type": "EMPLOYEE",
                "updated": null
            }
        ],
        "errors": [],
        "inactiveAffiliations": [],
        "metadata": {},
        "request": {
            "assetMap": {},
            "config": {
                "affiliationTypes": [
                    "EMPLOYEE"
                ],
                "assetTypes": [
                    "OTHER",
                    "PAY_STUB",
                    "OFFICIAL_LETTER",
                    "ID_CARD",
                    "DATED_ID_CARD"
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
                "opt-in": "By submitting information through this form, you authorize and instruct us to obtain and use information on you, including consumer reports from third parties, for purposes of verifying your eligibility for this program."
            },
            "organization": {
                "accountId": null,
                "alias": null,
                "city": "Beaverton",
                "emailDomain": null,
                "id": 142778,
                "name": "NIKE, Inc.",
                "state": "OR",
                "street": "",
                "type": "CORPORATE",
                "zip": "97005"
            },
            "personId": "5746fe11e4b0b8f88a64575c",
            "timestamp": 1466090847609,
            "userId": "4f70bfcfe4b01f7e8bec652e"
        },
        "requestId": "5762c55fe4b07ce90a1b1380",
        "result": true,
        "status": "COMPLETE",
        "timestamp": 1466090847621
    }
