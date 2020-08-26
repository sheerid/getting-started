SheerID API Recipes
===================

Perform a business verification
-------------------------------

Providing a business name and full mailing address is required in order to attempt verification. Additional response metadata is included for successful matches as shown below.

Example call:

    curl -H "Authorization: Bearer $TOKEN" \
        -d _affiliationTypes=BUSINESS \
        -d matchName=false \
        -d organization.name=SheerID \
        -d "organization.street=620 SW 5th Avenue" \
        -d organization.city=Portland \
        -d organization.stateCode=OR \
        -d organization.zip=97204 \
        https://services-sandbox.sheerid.com/rest/0.5/verification

Example successful response:

    {
        "errors": [],
        "timestamp": 1598466794992,
        "requestId": "5f46aaeac41884188b62dd6f",
        "status": "COMPLETE",
        "result": true,
        "metadata": {
            "NAICS Secondary Description": "TODO",
            "Company Match Confidence": "65",
            "Employees": "98",
            "Latitude": "44.032286",
            "NAICS Secondary": "TODO",
            "Year Founded": "2011",
            "Company Phone": "5415551212",
            "Company Address": "2451 WILLAMETTE ST",
            "SIC 8 Description": "TODO",
            "NAICS": "54151901",
            "Years in business": "5",
            "NAICS Description": "TODO",
            "Company City": "EUGENE",
            "Company State": "OR",
            "Stock Exchange": "TODO",
            "DSF Address Type": "B",
            "Ticker Symbol": "TODO",
            "SIC Description": "SOCIAL SERVICES NEC",
            "SIC 8 Secondary Description": "TODO",
            "SIC": "8399",
            "Longitude": "-123.090393",
            "Company Name": "SHEERID",
            "Revenue Site": "1930413",
            "DSF Delivery Type": "L",
            "SIC 8 Secondary": "TODO",
            "SIC 8": "TODO",
            "Company Zip": "97405"
        },
        "request": {
            "metadata": {},
            "timestamp": 1598466794937,
            "config": {
                "rewardIds": [],
                "consolationRewardIds": [],
                "metadata": {},
                "affiliationTypes": [
                    "BUSINESS"
                ],
                "verificationTypes": [
                    "AUTHORITATIVE",
                    "ASSET_REVIEW"
                ],
                "assetTypes": [
                    "DBA_REGISTRATION",
                    "ARTICLES_OF_INCORPORATION",
                    "BUSINESS_TAX_FORM_PAGE1",
                    "SECRETARY_OF_STATE_FILING"
                ],
                "organizationTypes": [],
                "notifierIds": [],
                "locale": "en_US",
                "testMode": true
            },
            "organization": {
                "id": 0,
                "accountId": null,
                "name": "SheerID",
                "type": null,
                "street": "620 SW 5th Avenue",
                "city": "Portland",
                "state": "OR",
                "zip": "97204",
                "country": "US",
                "aliases": [],
                "emailDomains": [],
                "ips": [],
                "tags": [],
                "active": true
            },
            "userId": "4f70bfcfe4b01f7e8bec652e",
            "personId": "545aa006e4b0bb6e6fbf69bd",
            "policyDefinitionValues": [
                {
                    "policyName": "default",
                    "value": "545aa006e4b0bb6e6fbf69bd",
                    "count": null,
                    "limit": null
                }
            ],
            "assetMap": {},
            "revisions": 1,
            "expirationDate": 1599071594937,
            "dataExpirationDate": 1661538795004,
            "active": false,
            "endUserId": "d2ce7ce2c9f2c8194ccb0ff2fbd2d28e001190ed461c56eca711aac5abdcdd67"
        },
        "responseTime": -1,
        "affiliations": [
            {
                "type": "BUSINESS",
                "organizationId": 0,
                "organizationName": "SHEERID",
                "updated": null,
                "start": null,
                "end": null,
                "attributes": [],
                "sourcePersonId": "5f46a80e5307c0189c0bd0fc"
            }
        ],
        "inactiveAffiliations": []
    }

Perform a Business Contact Verification
---------------------------------------

Business contact verification validates not only the organization data provided, but also ensures that the name provided is a listed contact for the business. Note: business contacts are generally limited to principals/directors in the business, and not all employees.

Example call:

    curl -H "Authorization: Bearer $TOKEN" \
        -d _affiliationTypes=BUSINESS_CONTACT \
        -d matchName=false \
        -d organization.name=SheerID \
        -d "organization.street=620 SW 5th Avenue" \
        -d organization.city=Portland \
        -d organization.stateCode=OR \
        -d organization.zip=97204 \
        -d FIRST_NAME=Sam \
        -d LAST_NAME=Sheer \
        https://services-sandbox.sheerid.com/rest/0.5/verification

Example successful response:

    {
        "errors": [],
        "timestamp": 1598466509275,
        "requestId": "5f46a9cd85be2618967c6e41",
        "status": "COMPLETE",
        "result": true,
        "metadata": {
            "NAICS Secondary Description": "TODO",
            "Company Match Confidence": "65",
            "Employees": "98",
            "Latitude": "44.032286",
            "NAICS Secondary": "TODO",
            "Year Founded": "2011",
            "Company Phone": "5415551212",
            "Company Address": "2451 WILLAMETTE ST",
            "SIC 8 Description": "TODO",
            "NAICS": "54151901",
            "Contact Match Confidence": "65",
            "Years in business": "5",
            "NAICS Description": "TODO",
            "Company City": "EUGENE",
            "Company State": "OR",
            "Stock Exchange": "TODO",
            "DSF Address Type": "B",
            "Ticker Symbol": "TODO",
            "SIC Description": "SOCIAL SERVICES NEC",
            "SIC 8 Secondary Description": "TODO",
            "SIC": "8399",
            "Longitude": "-123.090393",
            "Company Name": "SHEERID",
            "Revenue Site": "1930413",
            "DSF Delivery Type": "L",
            "SIC 8 Secondary": "TODO",
            "SIC 8": "TODO",
            "Company Zip": "97405"
        },
        "request": {
            "metadata": {},
            "timestamp": 1598466509183,
            "config": {
                "rewardIds": [],
                "consolationRewardIds": [],
                "metadata": {},
                "affiliationTypes": [
                    "BUSINESS_CONTACT"
                ],
                "verificationTypes": [
                    "AUTHORITATIVE",
                    "ASSET_REVIEW"
                ],
                "assetTypes": [
                    "POWER_OF_ATTORNEY",
                    "LETTER_OF_AUTHORIZATION",
                    "DBA_REGISTRATION"
                ],
                "organizationTypes": [],
                "notifierIds": [],
                "locale": "en_US",
                "testMode": true
            },
            "organization": {
                "id": 0,
                "accountId": null,
                "name": "SheerID",
                "type": null,
                "street": "620 SW 5th Avenue",
                "city": "Portland",
                "state": "OR",
                "zip": "97204",
                "country": "US",
                "aliases": [],
                "emailDomains": [],
                "ips": [],
                "tags": [],
                "active": true
            },
            "userId": "4f70bfcfe4b01f7e8bec652e",
            "personId": "5f46a9cd85be2618967c6e40",
            "policyDefinitionValues": [
                {
                    "policyName": "default",
                    "value": "5f46a9cd85be2618967c6e40",
                    "count": null,
                    "limit": null
                }
            ],
            "assetMap": {},
            "revisions": 1,
            "expirationDate": 1599071309183,
            "dataExpirationDate": 1661538509283,
            "active": false,
            "endUserId": "55d88e07cf401d2c58e462e379110ae6d86fd84b8d446b0f7d789ee9c079d596"
        },
        "responseTime": -1,
        "affiliations": [
            {
                "type": "BUSINESS_CONTACT",
                "organizationId": 0,
                "organizationName": "SHEERID",
                "updated": null,
                "start": null,
                "end": null,
                "attributes": [],
                "sourcePersonId": "5f46a80e5307c0189c0bd0fc"
            },
            {
                "type": "BUSINESS",
                "organizationId": 0,
                "organizationName": "SHEERID",
                "updated": null,
                "start": null,
                "end": null,
                "attributes": [],
                "sourcePersonId": "5f46a80e5307c0189c0bd0fc"
            }
        ],
        "inactiveAffiliations": []
    }
