![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Asset Upload
------------

If a requesting person is not successfully verified as meeting the required status, they have the option of uploading a document that will demonstrate their eligibility.

Generally you would present them with the information that they could not be electronically verified, ask if they would like to upload supporting documents, then present them with a form with which to select files.

### Attempt student verification

    curl -H "Authorization: Bearer 36ec91954e67a9301bf7ae469d1862bc" \
        -d "_affiliationTypes=STUDENT_FULL_TIME,STUDENT_PART_TIME&organizationId=3425& \
        FIRST_NAME=Test&LAST_NAME=User&BIRTH_DATE=1993-03-20&EMAIL=student@example.edu" \
        https://services.sheerid.com/rest/0.5/verification

Example unsuccessful response:

    {
        "affiliations":[],
        "inactiveAffiliations":
           [
            {
                "type":"STUDENT_PART_TIME",
                "organizationId":3425,
                "organizationName":"TULANE UNIVERSITY",
                "updated":1328996792391,
                "start":1329342392391,
                "end":1339793192391
            }
           ],
        "status":"COMPLETE",
        "result":false,
        "requestId":"50eccf8f84aeb02868250824",
        "errors":
           [
            {
                "code":92,
                "message":"Sandbox: odd birth year"
            }
           ],
        "timestamp":1358113592784,
        "request":
            {
                "metadata":{},
                "organization":
                    {
                        "id":3425,
                        "name":"TULANE UNIVERSITY",
                        "type":"UNIVERSITY"
                    },
                "timestamp":1358113592391,
                "userId":"50d0c25584aecfcdb6700a89",
                "config":
                    {
                        "affiliationTypes":["STUDENT_PART_TIME","STUDENT_FULL_TIME"],
                        "verificationTypes":["ASSET_REVIEW","AUTHORITATIVE"]
                    }
            },
        "metadata":{}
    }

### Request upload token

To upload an asset attached to a request, you need an upload token. You should use our API to request this prior to presenting the form for image selection.

    curl -H "Authorization: Bearer 36ec91954e67a9301bf7ae469d1862bc" \
        -d "requestId=50eccf8f84aeb02868250824" https://services.sheerid.com/rest/0.5/asset/token

Example response:

    {
        "token":"f610e5def9773e009992299c50e04f0a",
        "expires":1357783329206
    }

### Use token to upload image asset

Multiple images may be uploaded, just include additional `file=@filename` parameters. You will then receive more responses in the overall list returned.

    curl -H "Authorization: Bearer 36ec91954e67a9301bf7ae469d1862bc" \
        -F "token=f610e5def9773e009992299c50e04f0a" -F file=@student_id.jpg \
        https://services.sheerid.com/rest/0.5/asset`

Example response:

    [
        {
            "id":"50f0490084aee49b1597dffb",
            "name":"student_id.jpg",
            "type":"image/jpeg",
            "size":11410,
            "created":1357924608562,
            "status":"PENDING_REVIEW",
            "assetType":null,
            "comments":[],
            "errors":[],
            "issued":null,
            "expires":null
        }
    ]

### Await response

At this point, as the last example shows, the request is now pending review. Depending on your SLA this could take several minutes, so you may notify the customer that the request is processing and to check back later, and/or that you'll notify them when it's finished.  The best way to keep track of the status of this request is to use an HTTP Notifier as described in [Recipe 4: Notifiers](recipe-04-notifiers.md).  You may also use the [Inquire](http://developer.sheerid.com/docs/verification/inquire.html) API method to check the status of the request.

    curl -H "Authorization: Bearer 36ec91954e67a9301bf7ae469d1862bc" \
        https://services.sheerid.com/rest/0.5/verification/50eccf8f84aeb02868250824`

Example Response:

    {
        "affiliations":
           [
            {
                "type":"STUDENT_PART_TIME",
                "organizationId":3425,
                "organizationName":"TULANE UNIVERSITY",
                "updated":1328996792391,
                "start":null,
                "end":null
            }
           ],
        "inactiveAffiliations":[],
        "status":"COMPLETE",
        "result":true,
        "requestId":"50eccf8f84aeb02868250824",
        "errors":[],
        "timestamp":1358113592784,
        "request":
            {
                "metadata":{},
                "organization":
                    {
                        "id":3425,
                        "name":"TULANE UNIVERSITY",
                        "type":"UNIVERSITY"
                    },
                "timestamp":1358113592391,
                "userId":"50d0c25584aecfcdb6700a89",
                "config":
                    {
                        "affiliationTypes":["STUDENT_PART_TIME","STUDENT_FULL_TIME"],
                        "verificationTypes":["ASSET_REVIEW","AUTHORITATIVE"]
                    }
            },
        "metadata":{}
    }
