![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Perform a verification on an employee, successful response
------------------------------------

Example call:

    curl -H "Authorization: Bearer af61699f11d89d385c43f941a220bacf" \
        -d organizationId=142778 \
        -d FIRST_NAME=test \
        -d LAST_NAME=employee \
        -d ADDRESS1="123 main st" \
        -d CITY=Beaverton \
        -d STATE=OR \
        -d POSTAL_CODE=97008 \
        https://services-sandbox.sheerid.com/rest/0.5/verification

Example successful response:

    {
      "errors": [],
      "timestamp": 1464898769771,
      "requestId": "575094d1e4b0602c2c452e81",
      "status": "COMPLETE",
      "result": true,
      "metadata": {},
      "request": {
        "metadata": {},
        "timestamp": 1464898769763,
        "config": {
          "rewardIds": [],
          "consolationRewardIds": [],
          "metadata": {},
          "affiliationTypes": [
            "OWNER",
            "RESELLER",
            "EMPLOYEE",
            "CUSTOMER"
          ],
          "verificationTypes": [
            "AUTHORITATIVE",
            "ASSET_REVIEW"
          ],
          "assetTypes": [
            "IRS_SCHEDULE_K1_FORM_1120S",
            "IRS_SCHEDULE_K1_FORM_1065",
            "PAY_STUB",
            "IRS_SCHEDULE_G_FORM_1120",
            "LETTER_OF_AUTHORIZATION",
            "OFFICIAL_LETTER",
            "OTHER",
            "DBA_REGISTRATION",
            "SECRETARY_OF_STATE_FILING",
            "IRS_SCHEDULE_B1_FORM_1065",
            "VENDOR_STATEMENT",
            "BUSINESS_TAX_FORM_PAGE1",
            "IRS_SCHEDULE_C_OR_CEZ_PAGE_1",
            "ARTICLES_OF_INCORPORATION",
            "ID_CARD",
            "DATED_ID_CARD",
            "LEASE_AGREEMENT"
          ],
          "notifierIds": null
        },
        "organization": {
          "id": 142778,
          "accountId": null,
          "name": "NIKE, Inc.",
          "type": "CORPORATE",
          "street": "",
          "city": "Beaverton",
          "state": "OR",
          "zip": "97005",
          "alias": null,
          "emailDomain": null
        },
        "userId": "568bf9d5e4b0ae7bb115a73b",
        "personId": "57508a35e4b0602c2c452686",
        "assetMap": {}
      },
      "affiliations": [
        {
          "type": "EMPLOYEE",
          "organizationId": 142778,
          "organizationName": "NIKE, Inc.",
          "updated": null,
          "start": null,
          "end": null,
          "attributes": []
        }
      ],
      "inactiveAffiliations": []
    }

