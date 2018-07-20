![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Upload existing member data and verify against it
------------------------------------

This differs from our traditional verification in that you will supply a custom membership data source, effectively creating your own organization and populating its members. We will then verify against this custom dataset just as we would any other.

In the `curl` examples shown below, `$TOKEN` should be replaced with your actual REST API Bearer token.

### Create a custom organization

To begin we will first create the custom organization's dataset by defining who the members are and how to identify them.

	curl -X POST -H "Authorization: Bearer $TOKEN" \
		-d affiliationType=MEMBER \
		-d "name=Name of Dataset" \
		-d "organizationName=Name of Organization" \
		-d organizationType=CORPORATE \
		-d "fields=ID_NUMBER" \
		-d "fields=EMAIL" \
		https://services-sandbox.sheerid.com/rest/0.5/dataset

Example response:

	{
	    "affiliationType": "MEMBER", 
	    "fields": [
		   "ID_NUMBER", 
		   "EMAIL"
	    ], 
	    "id": "53307cd80cf2b0484fe7708a", 
	    "name": "Name of Dataset", 
	    "organization": {
		   "city": null, 
		   "id": 0, 
		   "name": "Name of Organization", 
		   "state": null, 
		   "type": "CORPORATE"
	    }, 
	    "updated": 1395686616850
	}

### Upload member entries

Next we will create a small sample of user data in csv format and upload the entries to our newly created dataset.

	curl -H "Authorization: Bearer $TOKEN" \
		https://services-sandbox.sheerid.com/rest/0.5/dataset/53307cd80cf2b0484fe7708a/entries \
		-F data=@./test-data.csv

test-data.csv:

	ID_NUMBER,EMAIL
	1,test1@sheerid.com
	2,test2@sheerid.com
	3,test3@sheerid.com

Example response:

	[
	    {
		   "expirationDate": null, 
		   "id": "533083ff0cf2b0484fe7708c"
	    }, 
	    {
		   "expirationDate": null, 
		   "id": "533083ff0cf2b0484fe7708d"
	    }, 
	    {
		   "expirationDate": null, 
		   "id": "533083ff0cf2b0484fe7708e"
	    }
	]

### Verify against the custom organization

Lastly we demonstrate a verification against the member entries in the csv file that we used to populate our dataset.

	curl -H "Authorization: Bearer $TOKEN" \
		https://services-sandbox.sheerid.com/rest/0.5/verification \
		-d _affiliationTypes=MEMBER \
		-d "organizationName=Name of Organization" \
		-d ID_NUMBER=1 \
		-d EMAIL=test1@sheerid.com

Example response:

	{
	    "affiliations": [
		   {
				  "attributes": [], 
				  "end": null, 
				  "organizationId": 0, 
				  "organizationName": "Name of Organization", 
				  "start": 1395694901467, 
				  "type": "MEMBER", 
				  "updated": 1395694901467
		   }
	    ], 
	    "errors": [], 
	    "inactiveAffiliations": [], 
	    "metadata": {}, 
	    "request": {
		   "config": {
				  "affiliationTypes": [
						 "MEMBER"
				  ], 
				  "assetTypes": [
						 "OFFICIAL_LETTER", 
						 "ID_CARD", 
						 "DATED_ID_CARD", 
						 "OTHER"
				  ], 
				  "consolationRewardIds": [], 
				  "metadata": {}, 
				  "rewardIds": [], 
				  "verificationTypes": [
						 "AUTHORITATIVE", 
						 "ASSET_REVIEW"
				  ]
		   }, 
		   "metadata": {}, 
		   "organization": {
				  "city": null, 
				  "id": 0, 
				  "name": "Name of Organization", 
				  "state": null, 
				  "type": null
		   }, 
		   "timestamp": 1395694901337, 
		   "userId": "52f0266f0cf26f0f51bbf51e"
	    }, 
	    "requestId": "53309d350cf2b0484fe77098", 
	    "result": true, 
	    "status": "COMPLETE", 
	    "timestamp": 1395694901468
	}

### Advanced Usage: Custom response metadata

#### Dataset setup

In order to return custom data in the API response based on the matched record, you can supply additional columns of data in your CSV file. Any column prefixed with `:public:` will be stored with the dataset entry and returned in a successful verification.

	curl -H "Authorization: Bearer $TOKEN" \
		https://services-sandbox.sheerid.com/rest/0.5/dataset/53307cd80cf2b0484fe7708a/entries \
		-F data=@./test-data-extended.csv

test-data-extended.csv:

	ID_NUMBER,EMAIL,:public:favoriteColor,:public:language
	1,test1@sheerid.com,blue,en
	2,test2@sheerid.com,green,es
	3,test3@sheerid.com,red,pt

#### Verify against the custom organization

The same verification request as shown above now responds with the additional custom response data contained within the `metadata` object:

	curl -H "Authorization: Bearer $TOKEN" \
		https://services-sandbox.sheerid.com/rest/0.5/verification \
		-d _affiliationTypes=MEMBER \
		-d "organizationName=Name of Organization" \
		-d ID_NUMBER=1 \
		-d EMAIL=test1@sheerid.com

Note the `favoriteColor` and `language` metadata values in the response match the custom attributes for the corresponding record in the dataset entries created above:

    {
        "affiliations": [
            {
                "attributes": [],
                "end": null,
                "organizationId": 0,
                "organizationName": "Name of Organization",
                "sourcePersonId": null,
                "start": null,
                "type": "MEMBER",
                "updated": null
            }
        ],
        "errors": [],
        "inactiveAffiliations": [],
        "metadata": {
            "favoriteColor": "blue",
            "language": "en"
        },
        "request": {
            "active": false,
            "assetMap": {},
            "config": {
                "affiliationTypes": [
                    "MEMBER"
                ],
                "assetTypes": [
                    "ID_CARD",
                    "DATED_ID_CARD",
                    "PAY_STUB",
                    "CERTIFICATION",
                    "OTHER",
                    "OFFICIAL_LETTER"
                ],
                "consolationRewardIds": [],
                "locale": "en_US",
                "metadata": {
                    "sandboxDelay": "600"
                },
                "notifierIds": null,
                "rewardIds": [],
                "verificationTypes": [
                    "AUTHORITATIVE",
                    "ASSET_REVIEW"
                ]
            },
            "expirationDate": 1532723488497,
            "metadata": {},
            "organization": {
                "accountId": null,
                "active": true,
                "aliases": [],
                "city": null,
                "country": "US",
                "emailDomains": [],
                "id": 0,
                "ips": [],
                "name": "Name of Organization",
                "state": null,
                "street": null,
                "tags": [],
                "type": null,
                "zip": null
            },
            "personId": "54ff3c0de4b06a0ad147f313",
            "policyDefinitionValues": [
                {
                    "policyName": "default",
                    "value": "54ff3c0de4b06a0ad147f313"
                }
            ],
            "revisions": 1,
            "timestamp": 1532118688497,
            "userId": "4f70bfcfe4b01f7e8bec652e"
        },
        "requestId": "5b5246a0c1b9261439e4c6f6",
        "result": true,
        "status": "COMPLETE",
        "timestamp": 1532118688516
    }
