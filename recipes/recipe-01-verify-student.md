SheerID API Recipes
===================

Perform a student verification, successful response
------------------------------------

Example call:

    curl -H "Authorization: Bearer $TOKEN" \
        -d _affiliationTypes=STUDENT_FULL_TIME,STUDENT_PART_TIME \
        -d organizationId=3425 \
        -d FIRST_NAME=Test \
        -d LAST_NAME=User \
        -d BIRTH_DATE=1992-03-20 \
        -d EMAIL=student@example.edu \
        https://services-sandbox.sheerid.com/rest/0.5/verification

Example successful response:

    {
        "affiliations":
           [
            {
                "type":"STUDENT_PART_TIME",
                "organizationId":3425,
                "organizationName":"TULANE UNIVERSITY",
                "updated":1330551729016,
                "start":1329342129016,
                "end":1339796529016
            }
           ],
        "inactiveAffiliations":[],
        "status":"COMPLETE",
        "result":true,
        "requestId":"50f08731e4b02be8f09152c6",
        "errors":[],
        "timestamp":1357940529020,
        "request":{
            "metadata":{},
            "organization":{
                "id":3425,
                "name":"TULANE UNIVERSITY",
                "type":"UNIVERSITY"
            },
            "timestamp":1357940529016,
            "userId":"d0327df4a17ac7cd21725",
            "config":{
                "affiliationTypes":["STUDENT_PART_TIME","STUDENT_FULL_TIME"],
                "verificationTypes":["ASSET_REVIEW","AUTHORITATIVE"]
            }
        },
        "metadata":{}
    }


Including college bound students 
------------------------------------

In addition to performing a verification for active students, the request can also perform a verification for students that are college bound by including `STUDENT_COLLEGE_BOUND` in addition to `STUDENT_FULL_TIME,STUDENT_PART_TIME` as an affiliationType.  Including only `STUDENT_COLLEGE_BOUND` as an affiliationType will only verify college bound students and not active students. 


Example call:

    curl -H "Authorization: Bearer $TOKEN" \
        -d _affiliationTypes=STUDENT_FULL_TIME,STUDENT_PART_TIME,STUDENT_COLLEGE_BOUND \
        -d organizationId=3425 \
        -d FIRST_NAME=Test \
        -d LAST_NAME=User \
        -d BIRTH_DATE=1992-03-20 \
        -d EMAIL=student@example.edu \
        https://services-sandbox.sheerid.com/rest/0.5/verification

Example successful response:

    {
        "errors": [],
        "timestamp": 1530910828973,
        "requestId": "5b3fd86cf7ca433be07a8b8b",
        "status": "COMPLETE",
        "result": true,
        "metadata": {},
        "request": {
            "metadata": {},
            "timestamp": 1530910828861,
            "config": {
                "rewardIds": [],
                "consolationRewardIds": [],
                "metadata": {},
                "affiliationTypes": [
                    "STUDENT_COLLEGE_BOUND",
                    "STUDENT_FULL_TIME",
                    "STUDENT_PART_TIME"
                ],
                "verificationTypes": [
                    "AUTHORITATIVE"
                ],
                "assetTypes": [],
                "notifierIds": null,
                "locale": "en_US"
            },
            "organization": {
                "id": 3425,
                "accountId": null,
                "name": "Tulane University",
                "type": "UNIVERSITY",
                "street": null,
                "city": "New Orleans",
                "state": "LA",
                "zip": "70118",
                "country": "US",
                "aliases": [
                    "TU"
                ],
                "emailDomains": [],
                "ips": [],
                "tags": [
                    "STUD-AUTH",
                    "TITLE4",
                    "US48"
                ],
                "active": true
            },
            "userId": "5ab179ff0cf251c83ee1ca47",
            "personId": "5b3fd814f7ca433be07a8b7f",
            "policyDefinitionValues": [
                {
                    "policyName": "default",
                    "value": "5b3fd814f7ca433be07a8b7f"
                }
            ],
            "assetMap": {},
            "revisions": 1,
            "expirationDate": 1531515628861,
            "active": false
        },
        "affiliations": [
            {
                "type": "STUDENT_COLLEGE_BOUND",
                "organizationId": 3425,
                "organizationName": "Tulane University",
                "updated": 1519938028861,
                "start": 1518728428861,
                "end": 1529096428861,
                "attributes": [],
                "sourcePersonId": null
            }
        ],
        "inactiveAffiliations": []
    }

