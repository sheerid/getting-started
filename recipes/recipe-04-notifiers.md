![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

# Adding a notifier

We provide a webhook-like notification system to inform you of the changes to your verifications. This is of most use for finding out when a manual verification has been processed. Please note that by default, this will send a request to your URL on every change to the VerificationRequest, *including the creation of the request*.  Filters can be used to restrict the types of events for which a notification will be generated.  It's important to note that this is a one-time setup step.  Once you've created a single HTTP notifier, it will fire for all future Verification Request change events until it is removed.  There is no need to perform this step for each Verification Request, only when setting up or reconfiguring your integration.  This step may also be performed from within the Control Center web application by following the link to "Configure Notifiers."

The parameter `url` is required. `method` is optional and defaults to "POST".

#### Example 1: Notify for all events

##### Request:

    curl -H "Authorization: Bearer $TOKEN" \
        https://services-sandbox.sheerid.com/rest/0.5/notifier \
        -d type=HTTP \
        -d url=http://mysite.com/callback.do \
        -d method=GET

##### Response:

    {
        "config": {
            "method": "GET",
            "url": "http://mysite.com/callback.do"
        },
        "filters": [],
        "id": "5322094be4b0e20972fe49b7",
        "tags": [],
        "type": "HTTP"
    }

#### Example 2: Notify only upon asynchronous success event (document review approved)

##### Request:

    curl -H "Authorization: Bearer $TOKEN" \
        https://services-sandbox.sheerid.com/rest/0.5/notifier \
        -d type=HTTP \
        -d url=http://mysite.com/callback.do \
        -d method=GET \
        -d 'filters={"eventType":"ASYNCHRONOUS_UPDATE", "result":"TRUE"}'

##### Response:

    {
        "config": {
            "method": "GET",
            "url": "http://mysite.com/callback.do"
        },
        "filters": [
            {
                "eventType": "ASYNCHRONOUS_UPDATE",
                "result": "TRUE",
                "status": null,
                "templateId": null
            }
        ],
        "id": "53220a2ae4b0e20972fe49d5",
        "tags": [],
        "type": "HTTP"
    }

#### Mock-up notification calls

This is what the request to your server will look like when an event trigger causes a notification to fire:

##### GET:
    curl http://mysite.com/callback.do?requestId=532205f9e4b0e20972fe4954

##### POST:
    curl http://mysite.com/callback.do -d "requestId=532205f9e4b0e20972fe4954"

## Handling notifications

Since you will receive the same notification each time a particular requestId has been updated, you will need to perform an additional SheerID API call after receiving this notification.  This also enables you as the receiver to ensure that the notification was in fact from a legitimate source, by calling out to the SheerID API to fetch the full response payload.

This section assumes you have followed the process outlined in [Recipe 02](recipe-02-verify-student-asset-upload.md), have uploaded an asset for manual review and are awaiting the completion of that review.  Once the asset has been reviewed, the status of the Verification Response will be updated and this will generate a new webhook notification. You should take the requestId and check the status of the request using the [Inquire](http://developer.sheerid.com/docs/verification/inquire.html) API method.  For more information about the specifics of the verification response, view the developer docs page about [Interpreting the Verification Response](http://developer.sheerid.com/docs/result-status.html).

### Perform an inquiry:

    curl -H "Authorization: Bearer $TOKEN" \
        https://services-sandbox.sheerid.com/rest/0.5/verification/532205f9e4b0e20972fe4954 \

#### Example pending response (document review still in process):

    {
        "status": "PENDING", 
        "errors": [], 
        "timestamp": 1394739146346, 
        "inactiveAffiliations": [], 
        "request": {
            "organization": null, 
            "config": {
                "rewardIds": [], 
                "assetTypes": [
                    "CLASS_SCHEDULE", 
                    "DATED_ID_CARD", 
                    "ID_CARD", 
                    "TUITION_RECEIPT", 
                    "REGISTRATION_RECEIPT", 
                    "TRANSCRIPT", 
                    "OTHER", 
                    "OFFICIAL_LETTER"
                ], 
                "consolationRewardIds": [], 
                "affiliationTypes": [
                    "STUDENT_FULL_TIME", 
                    "STUDENT_PART_TIME"
                ], 
                "verificationTypes": [
                    "AUTHORITATIVE", 
                    "ASSET_REVIEW"
                ], 
                "metadata": {}
            }, 
            "userId": "d0327df4a17ac7cd21725", 
            "timestamp": 1394739098537, 
            "metadata": {}
        }, 
        "affiliations": [], 
        "result": null, 
        "metadata": {}, 
        "requestId": "532205f9e4b0e20972fe4954"
    }

#### Example successful response:

    {
        "status": "COMPLETE", 
        "errors": [], 
        "timestamp": 1394738752781, 
        "inactiveAffiliations": [], 
        "request": {
            "organization": null, 
            "config": {
                "rewardIds": [], 
                "assetTypes": [
                    "CLASS_SCHEDULE", 
                    "DATED_ID_CARD", 
                    "ID_CARD", 
                    "TUITION_RECEIPT", 
                    "REGISTRATION_RECEIPT", 
                    "TRANSCRIPT", 
                    "OTHER", 
                    "OFFICIAL_LETTER"
                ], 
                "consolationRewardIds": [], 
                "affiliationTypes": [
                    "STUDENT_FULL_TIME", 
                    "STUDENT_PART_TIME"
                ], 
                "verificationTypes": [
                    "AUTHORITATIVE", 
                    "ASSET_REVIEW"
                ], 
                "metadata": {}
            }, 
            "userId": "d0327df4a17ac7cd21725", 
            "timestamp": 1394738681135, 
            "metadata": {}
        }, 
        "affiliations": [
            {
                "updated": 1393692720423, 
                "organizationName": "DUKE UNIVERSITY", 
                "organizationId": 943, 
                "start": 1392483120423, 
                "attributes": [], 
                "end": 1402851120423, 
                "type": "STUDENT_FULL_TIME"
            }
        ], 
        "result": true, 
        "metadata": {}, 
        "requestId": "532205f9e4b0e20972fe4954"
    }

#### Example unsuccessful response (in this case, due to the date on the uploaded document not being valid):

    {
        "status": "COMPLETE", 
        "errors": [
            {
                "message": "date does not match our records", 
                "code": 31
            }
        ], 
        "timestamp": 1394738956624, 
        "inactiveAffiliations": [], 
        "request": {
            "organization": null, 
            "config": {
                "rewardIds": [], 
                "assetTypes": [
                    "CLASS_SCHEDULE", 
                    "DATED_ID_CARD", 
                    "ID_CARD", 
                    "TUITION_RECEIPT", 
                    "REGISTRATION_RECEIPT", 
                    "TRANSCRIPT", 
                    "OTHER", 
                    "OFFICIAL_LETTER"
                ], 
                "consolationRewardIds": [], 
                "affiliationTypes": [
                    "STUDENT_FULL_TIME", 
                    "STUDENT_PART_TIME"
                ], 
                "verificationTypes": [
                    "AUTHORITATIVE", 
                    "ASSET_REVIEW"
                ], 
                "metadata": {}
            }, 
            "userId": "d0327df4a17ac7cd21725", 
            "timestamp": 1394738924383, 
            "metadata": {}
        }, 
        "affiliations": [], 
        "result": false, 
        "metadata": {}, 
        "requestId": "532205f9e4b0e20972fe4954"
    }
