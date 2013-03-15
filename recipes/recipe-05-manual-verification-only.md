SheerID API Recipes
===================

Perform a manual verification directly
------------------------------------

Normally our clients do an automatic verification, and only perform a manual verification if the automatic verification comes back false or undetermined. For some types of end-users or some applications, you will already know a student will not be in the authoritative database and you will simply want them to upload documentation and not incur the extra cost of automatic verification.

First, create a manual verification request. Note the additional use of the _verificationTypes parameter.

    curl -3 -H "Authorization: Bearer 36ec91954e67a9301bf7ae469d1862bc" \
        -F _affiliationTypes=STUDENT_FULL_TIME,STUDENT_PART_TIME \
        -F organizationId=342 \
        -F FIRST_NAME=Test \
        -F LAST_NAME=User \
        -F BIRTH_DATE=1992-03-20 \
        -F EMAIL=student@example.edu \
        -F _verificationTypes=ASSET_REVIEW \
        https://services.sheerid.com/rest/0.5/verification

Example response:

    {
        "status": "COMPLETE",
        "errors": [
            {
                "message": "Awaiting documentation upload",
                "code": 39
            }
        ],
        "timestamp": 1363384502907,
        "inactiveAffiliations": [],
        "request": {
            "organization": {
                "type": "UNIVERSITY",
                "id": 1,
                "name": "A.T. STILL UNIVERSITY OF HEALTH SCIENCES"
            },
            "config": {
                "verificationTypes": [
                    "ASSET_REVIEW"
                ],
                "affiliationTypes": [
                    "FACULTY",
                    "STUDENT_FULL_TIME",
                    "STUDENT_PART_TIME",
                    "EMPLOYEE"
                ]
            },
            "userId": "50d0c25584aecfcdb6700a89",
            "timestamp": 1363384502818,
            "metadata": {}
        },
        "affiliations": [],
        "result": null,
        "metadata": {},
        "requestId": "50eccf8f84aeb02868250824"
    }

At this point, you can follow the same process as in Recipe 02, starting with Request Upload Token.