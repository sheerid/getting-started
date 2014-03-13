![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

# Adding a notifier

We provide a webhook-like notification system to inform you of the changes to your verifications. This is of most use for finding out when a manual verification has been processed. Please note that in Version 0.5 this will send a request to your URL on every change to the VerificationRequest, *including the creation of the request*. This recipe contains notes on proper usage of this information


#### Example:

    curl -3 -H "Authorization: Bearer $TOKEN" \
        https://services-sandbox.sheerid.com/rest/0.5/notifier \
        -d type=HTTP \
        -d url=http://mysite.com/callback.do \
        -d method=GET

The parameter `url` is required. `method` is optional and defaults to "POST".

#### Mock-up notification calls:

`curl http://mysite.com/callback.do?requestId=50f08731e4b02be8f09152c6`

`curl http://mysite.com/callback.do -d "requestId=50f08731e4b02be8f09152c6"`

## Handling notifications

Since you will receive the same notification each time a particular requestId has been updated, you will need to perform an additional SheerID API call after receiving this notification. This section assumes you have followed the process outlined in Recipe 02, and have uploaded an asset for manual review.

Once the asset has been reviewed, the status of that asset will be updated and this will generate a new webhook notification. You would take the requestId and check the status of the request in one of two ways:

#### Check if there are any ACCEPTED asset reviews:

    curl -3 -H "Authorization: Bearer $TOKEN" \
        https://services-sandbox.sheerid.com/rest/0.5/verification/50f08731e4b02be8f09152c6/assets \

Example successful response:

    [
        {
            "id":"50f0490084aee49b1597dffb",
            "name":"student_id.jpg",
            "type":"image/jpeg",
            "size":11410,
            "created":1357924608562,
            "status":"ACCEPTED",
            "assetType":null,
            "comments":[],
            "errors":[],
            "issued":null,
            "expires":null
        }
    ]

Example unsuccessful response:

    [
        {
            "id":"50f0490084aee49b1597dffb",
            "name":"student_id.jpg",
            "type":"image/jpeg",
            "size":11410,
            "created":1357924608562,
            "status":"REJECTED",
            "assetType":null,
            "comments":[],
            "errors":[],
            "issued":null,
            "expires":null
        }
    ]