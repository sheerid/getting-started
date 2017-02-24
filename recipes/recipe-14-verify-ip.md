# SheerID API Recipes

## IP Address Verification

The following recipe demonstrates use of `IP_ADDRESS` verification type. Because the REST API traffic is originating from a host other than the actual end-user, the (IPv4) IP address of the end-user should be read from the actual user request, and supplied for verification via POST form parameter `endUserIp`.

### Retrieve a list of supported organizations:

Using [List Organizations](http://developer.sheerid.com/docs/organization/listOrganizations.html) resource, add the `tag` query string parameter with a value of `IP` in addition to the organization type (e.g. `type=UNIVERSITY` to obtain a list of schools), and (optionally) the country code of interest. Caching this list daily/weekly is a suggested performance improvement, so it need not be fetched for each user.

````
$ curl -H "Authorization: Bearer $TOKEN" \
    "https://services-sandbox.sheerid.com/rest/0.5/organization?type=UNIVERSITY&tag=IP&country=GB"

[
    {
        "accountId": null,
        "active": true,
        "aliases": [],
        "city": null,
        "country": "GB",
        "emailDomains": [
            "blackpool.ac.uk"
        ],
        "id": 273471,
        "ips": [
            "193.63.160.0/24",
            "193.63.165.0/24",
            "193.63.161.0/24",
            "193.63.164.0/24",
            "193.63.166.0/24",
            "193.63.162.0/24",
            "193.63.163.0/24",
            "193.63.167.0/24"
        ],
        "name": "Blackpool and The Fylde College",
        "state": null,
        "street": null,
        "tags": [
            "NO-HEI",
            "SSO",
            "EMAIL",
            "IP"
        ],
        "type": "UNIVERSITY",
        "zip": null
    },
    ...
]
````

### Successful result

If an IP address matching the range(s) configured for that organization is provided, the `result` will be `true` with `affiliations` that show the confirmed organization. The `affiliationTypes` provided with the request are taken at face value - at this time we can only confirm association with the university network(s), not the specific status (student, teacher) of the individual using that IP.

````
$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification \
    -d _verificationTypes=IP_ADDRESS -d _affiliationTypes=STUDENT_FULL_TIME \
    -d organizationId=3640 \
    -d FIRST_NAME=Jane -d LAST_NAME=Student \
    -d endUserIp=128.223.142.244

{
    "affiliations": [
        {
            "attributes": [],
            "end": null,
            "organizationId": 3640,
            "organizationName": "UNIVERSITY OF OREGON (UO)",
            "sourcePersonId": null,
            "start": null,
            "type": "STUDENT_FULL_TIME",
            "updated": 1487711163077
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
                "IP_ADDRESS"
            ]
        },
        "expirationDate": 1488315963071,
        "metadata": {
            "ipv4Address": "128.223.142.244"
        },
        "organization": {
            "accountId": null,
            "active": true,
            "aliases": [
                "UO"
            ],
            "city": "EUGENE",
            "country": "US",
            "emailDomains": [],
            "id": 3640,
            "ips": [
                "128.223.0.0/16"
            ],
            "name": "UNIVERSITY OF OREGON (UO)",
            "state": "OR",
            "street": "",
            "tags": [],
            "type": "UNIVERSITY",
            "zip": "97403-5257"
        },
        "personId": "58acab93e4b0552187036f2b",
        "revisions": 1,
        "timestamp": 1487711163071,
        "userId": "4f70bfcfe4b01f7e8bec652e"
    },
    "requestId": "58acabbbe4b0708586e99345",
    "result": true,
    "status": "COMPLETE",
    "timestamp": 1487711163077
}
````

### Failure result (inconclusive)

If an IP address that does not match the range(s) configured for that organization is provided, the `result` will be `null` with no `affiliations` returned.

````
$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification \
    -d _verificationTypes=IP_ADDRESS -d _affiliationTypes=STUDENT_FULL_TIME \
    -d organizationId=3640 \
    -d FIRST_NAME=Joe -d LAST_NAME=Smith \
    -d endUserIp=192.168.1.1

{
    "affiliations": [],
    "errors": [],
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
                "IP_ADDRESS"
            ]
        },
        "expirationDate": 1488315982036,
        "metadata": {
            "ipv4Address": "192.168.1.1"
        },
        "organization": {
            "accountId": null,
            "active": true,
            "aliases": [
                "UO"
            ],
            "city": "EUGENE",
            "country": "US",
            "emailDomains": [],
            "id": 3640,
            "ips": [
                "128.223.0.0/16"
            ],
            "name": "UNIVERSITY OF OREGON (UO)",
            "state": "OR",
            "street": "",
            "tags": [],
            "type": "UNIVERSITY",
            "zip": "97403-5257"
        },
        "personId": "58acabcee4b0552187036f3d",
        "revisions": 1,
        "timestamp": 1487711182036,
        "userId": "4f70bfcfe4b01f7e8bec652e"
    },
    "requestId": "58acabcee4b0552187036f3e",
    "result": null,
    "status": "COMPLETE",
    "timestamp": 1487711182045
}
````

### Organization not supported

In the case where IP information is not available for the specified organization, the caller will receive a 400 HTTP status code and a message indicating the organization is not supported.

````
$ curl -H "Authorization: Bearer $TOKEN" https://services-sandbox.sheerid.com/rest/0.5/verification \
    -d _verificationTypes=IP_ADDRESS -d _affiliationTypes=STUDENT_FULL_TIME \
    -d organizationId=3620 \
    -d FIRST_NAME=Jane -d LAST_NAME=Student \
    -d endUserIp=127.0.0.1

{
    "errorCode": 3,
    "httpStatus": 400,
    "message": "Unsupported Organization",
    "status": "400"
}
````