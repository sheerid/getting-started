# SheerID API Recipes

## Email Verification

The following recipes are provided to confirm that the user's email domain is valid. It is possible to confirm that the email's domain is whitelisted for the organization, that the email is accessible to the user, or both.

## Email domain whitelist validation

The VALIDATION verification type will return true if the users email address has a domain that is whitelisted for the organization.

    curl -k -H "Authorization: Bearer {AccessToken}"\
        -d "organizationId=123456789"\ 
        -d _affiliationTypes=STUDENT_FULL_TIME\ 
        -d "EMAIL=joe@whitelisted-domain.com"\ 
        -d _verificationTypes=VALIDATION\ 
        https://services.sheerid.com/rest/0.5/verification

Example response indicating the users email is valid for the organization.

    {
        "affiliations": [
            {
                "attributes": [],
                "end": null,
                "organizationId": 3600,
                "organizationName": "UNIVERSITY OF MISSOURI (KANSAS CITY)",
                "sourcePersonId": null,
                "start": null,
                "type": "STUDENT_FULL_TIME",
                "updated": 1490209695607
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
                    "STUDENT_FULL_TIME"
                ],
                "assetTypes": [],
                "consolationRewardIds": [],
                "locale": "en_US",
                "metadata": {},
                "notifierIds": null,
                "rewardIds": [],
                "verificationTypes": [
                    "VALIDATION"
                ]
            },
            "expirationDate": 1490814495584,
            "metadata": {},
            "organization": {
                "accountId": null,
                "active": true,
                "aliases": [],
                "city": "KANSAS CITY",
                "country": "US",
                "emailDomains": [
                    "whitelisted-domain.com"
                ],
                "id": 3600,
                "ips": [],
                "name": "UNIVERSITY OF MISSOURI (KANSAS CITY)",
                "state": "MO",
                "street": "",
                "tags": [],
                "type": "UNIVERSITY",
                "zip": "64110"
            },
            "personId": "56c360eb0cf2158a444ba7d9",
            "revisions": 1,
            "timestamp": 1490209695584,
            "userId": "54663a0c0cf2fcc728d73acb"
        },
        "requestId": "58d2cb9f0cf25d6b78217b7b",
        "result": true,
        "status": "COMPLETE",
        "timestamp": 1490209695607
    }


## Email domain whitelist and email loop

The high assurance level VALIDATION will first validate that the email domain is whitelisted and return true after collecting a challenge code from the user and the challenge answer is posted.

    curl -k -H "Authorization: Bearer {AccessToken}"\
        -d "organizationId=123456789"\ 
        -d _affiliationTypes=STUDENT_FULL_TIME\ 
        -d "EMAIL=joe@whitelisted-domain.com"\ 
        -d _verificationTypes=VALIDATION\ 
        -d _assuranceLevel=HIGH\ 
        https://services.sheerid.com/rest/0.5/verification

Example response indicating that a challenge code has been sent to he user.

    {
        "affiliations": [],
        "errors": [
            {
                "code": 602,
                "message": "Waiting for Email Verification",
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
                "assetTypes": [],
                "consolationRewardIds": [],
                "locale": "en_US",
                "metadata": {
                    "assuranceLevel": "HIGH"
                },
                "notifierIds": null,
                "rewardIds": [],
                "verificationTypes": [
                    "VALIDATION"
                ]
            },
            "expirationDate": 1490814073967,
            "metadata": {},
            "organization": {
                "accountId": null,
                "active": true,
                "aliases": [],
                "city": "KANSAS CITY",
                "country": "US",
                "emailDomains": [
                    "whitelisted-domain.com"
                ],
                "id": 3600,
                "ips": [],
                "name": "UNIVERSITY OF MISSOURI (KANSAS CITY)",
                "state": "MO",
                "street": "",
                "tags": [],
                "type": "UNIVERSITY",
                "zip": "64110"
            },
            "personId": "56c360eb0cf2158a444ba7d9",
            "revisions": 1,
            "timestamp": 1490209273967,
            "userId": "54663a0c0cf2fcc728d73acb"
        },
        "requestId": "58d2c9f90cf25d6b78217b76",
        "result": null,
        "status": "PENDING",
        "timestamp": 1490209273991
    }


## Email ownership verification

The EMAIL_LOOP verification type will return true after collecting the email verification code from the user and posting it to the challenge api.

    curl -k -H "Authorization: Bearer {AccessToken}"\
        -d "organizationId=123456789"\ 
        -d _affiliationTypes=STUDENT_FULL_TIME\ 
        -d "EMAIL=joe@whitelisted-domain.com"\ 
        -d _verificationTypes=EMAIL_LOOP\ 
        https://services.sheerid.com/rest/0.5/verification

Example response indicating that a challenge code has been sent to he user.

    {
        "affiliations": [],
        "errors": [
            {
                "code": 602,
                "message": "Waiting for Email Verification",
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
                "assetTypes": [],
                "consolationRewardIds": [],
                "locale": "en_US",
                "metadata": {},
                "notifierIds": null,
                "rewardIds": [],
                "verificationTypes": [
                    "EMAIL_LOOP"
                ]
            },
            "expirationDate": 1490814073967,
            "metadata": {},
            "organization": {
                "accountId": null,
                "active": true,
                "aliases": [],
                "city": "KANSAS CITY",
                "country": "US",
                "emailDomains": [
                    "whitelisted-domain.com"
                ],
                "id": 3600,
                "ips": [],
                "name": "UNIVERSITY OF MISSOURI (KANSAS CITY)",
                "state": "MO",
                "street": "",
                "tags": [],
                "type": "UNIVERSITY",
                "zip": "64110"
            },
            "personId": "56c360eb0cf2158a444ba7d9",
            "revisions": 1,
            "timestamp": 1490209273967,
            "userId": "54663a0c0cf2fcc728d73acb"
        },
        "requestId": "58d2c9f90cf25d6b78217b76",
        "result": null,
        "status": "PENDING",
        "timestamp": 1490209273991
    }


## Answering email loop challenge question

If confirming the ownership of an email it will be necessary to collect the challenge code from the user and submit it to the challenge api.

    curl -k -H "Authorization: Bearer {AccessToken}"\ 
        https://services.sheerid.com/rest/0.5/challenge?requestId={requestId}

Example response containing a challengeSetId and a challengeQuestionId that can be used for answering the challenge question.

    {
        "id":"58d16ea40cf25d6b78217acc",
        "questions":[
            {
                "id":"58d16ea40cf25d6b78217aca",
                "questionText":"Thank you.<br>Please check your email to verify your email address. If you do not receive an email, please check your junk/spam folder.",
               "choices":null
            }
        ]
    }

Once the challenge code is provided by the user it can be posted to the api to complete the verification.

    curl -k -H "Authorization: Bearer {AccessToken}"\
        -d 58d16ea40cf25d6b78217aca={challengeCode}\
        https://services.sheerid.com/rest/0.5/challenge/58d16ea40cf25d6b78217acc

Example response indicating that the challenge code is valid and the verification is complete.

    {  
       "errors":[],
       "timestamp":1490130195250,
       "requestId":"58d16ce30cf25d6b78217ac5",
       "status":"COMPLETE",
       "result":true,
       "metadata":{},
       "request":{  
          "metadata":{},
          "timestamp":1490119907826,
          "config":{  
             "rewardIds":[],
             "consolationRewardIds":[],
             "metadata":{},
             "affiliationTypes":[  
                "STUDENT_FULL_TIME"
             ],
             "verificationTypes":[  
                "EMAIL_LOOP"
             ],
             "assetTypes":[],
             "notifierIds":null,
             "locale":"en_US"
          },
          "organization":{  
             "id":3600,
             "accountId":null,
             "name":"UNIVERSITY OF MISSOURI (KANSAS CITY)",
             "type":"UNIVERSITY",
             "street":null,
             "city":"KANSAS CITY",
             "state":"MO",
             "zip":"64110",
             "country":"US",
             "aliases":[],
             "emailDomains":[],
             "ips":[],
             "tags":[],
             "active":true
          },
          "userId":"54663a0c0cf2fcc728d73acb",
          "personId":"56c360eb0cf2158a444ba7d9",
          "assetMap":{},
          "revisions":1,
          "expirationDate":1490724707826,
          "active":false
       },
       "affiliations":[  
          {  
             "type":"STUDENT_FULL_TIME",
             "organizationId":3600,
             "organizationName":"UNIVERSITY OF MISSOURI (KANSAS CITY)",
             "updated":1490119907883,
             "start":null,
             "end":null,
             "attributes":[],
             "sourcePersonId":null
          }
       ],
       "inactiveAffiliations":[]
    }

