![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Verification With Request Configuration Template
------------------------------------

### Overview

A verification request template can be created once and reused on a per-request basis to specify the request configuration (verification types, eligible affiliation types, rewards, etc.). This approach allows the application's business rules to be fine-tuned over time without having to change API client code.

### Steps

Instead of supplying request configuration (request parameters prefixed with underscore "_" character), the caller supplies a templateId and the request configuration is derived from the specified template. In this example, we will use the ID of the template we created in the Appendix below (`5550c275e4b057d1e9429a70`).

    $ curl -H "Authorization: Bearer $TOKEN" \
       -d templateId=5550c275e4b057d1e9429a70 \
       -d FIRST_NAME=Joe \
       -d LAST_NAME=Student \
       -d BIRTH_DATE=1992-03-21 \
       -d organizationId=445 \
       https://services-sandbox.sheerid.com/rest/0.5/verification

    {
       "affiliations": [{
          "attributes": [],
          "end": 1434380074801,
          "organizationId": 445,
          "organizationName": "CARNEGIE MELLON UNIVERSITY (CMU)",
          "start": 1424012074801,
          "type": "STUDENT_FULL_TIME",
          "updated": 1425221674801
       }],
       "errors": [],
       "inactiveAffiliations": [],
       "metadata": {},
       "request": {
          "assetMap": {},
          "config": {
             "affiliationTypes": ["STUDENT_FULL_TIME", "STUDENT_PART_TIME", "FACULTY"],
             "assetTypes": [
                "CLASS_SCHEDULE", "PAY_STUB", "OFFICIAL_LETTER", "ID_CARD", "TRANSCRIPT", "TUITION_RECEIPT", "DATED_ID_CARD", "REGISTRATION_RECEIPT", "OTHER"
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
          "metadata": {},
          "organization": {
             "alias": null,
             "city": "PITTSBURGH",
             "id": 445,
             "name": "CARNEGIE MELLON UNIVERSITY (CMU)",
             "state": "PA",
             "street": null,
             "type": "UNIVERSITY",
             "zip": null
          },
          "personId": "5550c2aae4b057d1e9429a73",
          "timestamp": 1431356077425,
          "userId": "4f70bfcfe4b01f7e8bec652e"
       },
       "requestId": "5550c2ade4b057d1e9429a78",
       "result": true,
       "status": "COMPLETE",
       "timestamp": 1431356077445
    }

### Appendix A. One-Time Setup Steps

The following example demonstrates creation of a template via REST API (using curl). The same can be accomplished within the control-center web application.

    $ curl -H "Authorization: Bearer $TOKEN" \
       -d name=Academic \
       -d _affiliationTypes=STUDENT_FULL_TIME,STUDENT_PART_TIME,FACULTY \
       https://services-sandbox.sheerid.com/rest/0.5/template

    {
       "active": true,
       "config": {
          "affiliationTypes": [
             "STUDENT_FULL_TIME", "STUDENT_PART_TIME", "FACULTY"
          ],
          "assetTypes": [
             "CLASS_SCHEDULE", "PAY_STUB", "OFFICIAL_LETTER", "ID_CARD", "TRANSCRIPT", "TUITION_RECEIPT", "DATED_ID_CARD", "REGISTRATION_RECEIPT", "OTHER"
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
       "expires": null,
       "id": "5550c275e4b057d1e9429a70",
       "metadata": {},
       "name": "Academic"
    }

Note the template ID created: `5550c275e4b057d1e9429a70`. This value can now be used as a parameter when performing a verification request (see above).