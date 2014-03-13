SheerID API Recipes
===================

Perform a verification, successful response
------------------------------------

Example call:

    curl -3 -H "Authorization: Bearer 9718d0d4fa4ca4ab044d4db767f75211" \
        -d _affiliationTypes=STUDENT_FULL_TIME,STUDENT_PART_TIME \
        -d organizationId=3425 \
        -d FIRST_NAME=Test \
        -d LAST_NAME=User \
        -d BIRTH_DATE=1992-03-20 \
        -d EMAIL=student@example.edu \
        https://services.sheerid.com/rest/0.5/verification

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
