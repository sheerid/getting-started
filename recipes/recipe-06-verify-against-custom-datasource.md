![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Upload existing member data and verify against it
------------------------------------

This differs from our traditional verification in that you will supply a custom membership data source, effectively creating your own organization and populating its members. We will then verify against this custom dataset just as we would any other.

### Create a custom organization

To begin we will first create the custom organization's dataset by defining who the members are and how to identify them.
	curl -3X POST -H "Authorization: Bearer 49edc4a96ee5f5ac8c1c9b0dbadbb4ba" /
		-d affiliationType=MEMBER /
		-d "name=Name of Dataset" /
		-d "organizationName=Name of Organization" /
		-d organizationType=CORPORATE /
		-d "fields=ID_NUMBER" /
		-d "fields=EMAIL" /
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

test-data.csv:
	ID_NUMBER,EMAIL
	1,test1@sheerid.com
	2,test2@sheerid.com
	3,test3@sheerid.com


	curl -H "Authorization: Bearer 49edc4a96ee5f5ac8c1c9b0dbadbb4ba" /
		https://services-sandbox.sheerid.com/rest/0.5/dataset/53307cd80cf2b0484fe7708a/entries /
		-F data=@/Users/[username]/Desktop/test-data.csv

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
	curl -H "Authorization: Bearer 49edc4a96ee5f5ac8c1c9b0dbadbb4ba" 
		https://services-sandbox.sheerid.com/rest/0.5/verification 
		-d _affiliationTypes=MEMBER  
		-d "organizationName=Name of Organization" 
		-d ID_NUMBER=1 
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