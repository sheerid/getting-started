# Document review verification with organization name

## Steps

### Attempt verification without organization ID

Because `organizationId` is omitted, there is no potential for instant student verification. An error is returned indicating document review is the next step.

    $ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification -d _affiliationTypes=STUDENT_FULL_TIME -d FIRST_NAME=Joe -d LAST_NAME=Student -d BIRTH_DATE=1987-03-25 -d "organizationName=Harvard University" -d matchName=false
    
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
            "assetMap": {},
            "config": {
                "affiliationTypes": [
                    "STUDENT_FULL_TIME"
                ],
                "assetTypes": [
                    "OFFICIAL_LETTER",
                    "REGISTRATION_RECEIPT",
                    "CLASS_SCHEDULE",
                    "DATED_ID_CARD",
                    "TUITION_RECEIPT",
                    "ID_CARD",
                    "OTHER",
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
            "metadata": {},
            "organization": {
                "alias": null,
                "city": null,
                "id": 0,
                "name": "Harvard University",
                "state": null,
                "street": null,
                "type": null,
                "zip": null
            },
            "personId": "55671e97e4b07ef6cbae4cac",
            "timestamp": 1432821399972,
            "userId": "4f70bfcfe4b01f7e8bec652e"
        },
        "requestId": "55671e97e4b07ef6cbae4cad",
        "result": null,
        "status": "COMPLETE",
        "timestamp": 1432821400000
    }

### Issue an asset upload token

Using the requestId from previous call, issue a single-use document upload token.

    $ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/asset/token -d requestId=55671e97e4b07ef6cbae4cad
    
    {
        "expires": 1432907806487,
        "token": "f86f1059809f021ae6515ae0d0b7d884"
    }

### Upload a document

Upload a document that will pass review. In this case we are using one of our [special sandbox testing documents](http://developer.sheerid.com/autoreview.html)

    $ curl https://services-sandbox.sheerid.com/rest/0.5/asset -F token=f86f1059809f021ae6515ae0d0b7d884 -F file=@SandboxTesting~ACCEPTED.png 
    
    [
        {
            "assetType": null,
            "assetTypeDescription": null,
            "comments": [],
            "created": 1432821519622,
            "errors": [],
            "expires": null,
            "id": "55671f0fe4b0a73500cc1797",
            "issued": null,
            "name": "SandboxTesting~ACCEPTED.png",
            "size": 505520,
            "status": "PENDING_REVIEW",
            "type": "image/png"
        }
    ]

### Attempt verification once again

After the user has been successfully verified as a student via document review, the same request that previously failed will now complete with an instant successful verification result.

    $ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification -d _affiliationTypes=STUDENT_FULL_TIME -d FIRST_NAME=Joe -d LAST_NAME=Student -d BIRTH_DATE=1987-03-25 -d "organizationName=Harvard University" -d matchName=false
    
    {
        "affiliations": [
            {
                "attributes": [],
                "end": null,
                "organizationId": 0,
                "organizationName": "Harvard University",
                "start": null,
                "type": "STUDENT_FULL_TIME",
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
                    "STUDENT_FULL_TIME"
                ],
                "assetTypes": [
                    "DATED_ID_CARD",
                    "ID_CARD",
                    "CLASS_SCHEDULE",
                    "REGISTRATION_RECEIPT",
                    "TRANSCRIPT",
                    "OFFICIAL_LETTER",
                    "TUITION_RECEIPT",
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
            "metadata": {},
            "organization": {
                "alias": null,
                "city": null,
                "id": 0,
                "name": "Harvard University",
                "state": null,
                "street": null,
                "type": null,
                "zip": null
            },
            "personId": "55671e97e4b07ef6cbae4cac",
            "timestamp": 1432821529896,
            "userId": "4f70bfcfe4b01f7e8bec652e"
        },
        "requestId": "55671f19e4b0a73500cc179b",
        "result": true,
        "status": "COMPLETE",
        "timestamp": 1432821529915
    }
