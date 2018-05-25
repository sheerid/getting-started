SheerID Getting Started - Age Verification
---

The example queries below are all extremely similar except that the `_mainJavascriptFunction` parameter differs between them.  In the example you see directly below which verifies that a person is 30 years old or younger, you can see the javascript code which does that check.  You are entirely free to modify that javascript in your queries to fit your needs, using any age ranges you want.

Verifying that someone is 30 years old or younger:
---

```
curl -H "Authorization: Bearer {yourBearerTokenHere}" \
	-d _affiliationTypes=AGE \
	-d FIRST_NAME=Test \
	-d LAST_NAME=User \
	-d BIRTH_DATE=1997-05-25 \
	-d _logic=Scripting \
	--data-urlencode _mainJavascriptFunction="function main() { for (var i = 0; i < responses.size(); i++) { if (responses.get(i).resultCode == 'APPROVED') { return (request.person.age <= 30); } } return false; }" \
	https://preview.sheerid.com/rest/0.5/verification
```

Verifying that someone is between 18 and 30 years old (inclusive):
---

```
curl -H "Authorization: Bearer {yourBearerTokenHere}" \
	-d _affiliationTypes=AGE \
	-d FIRST_NAME=Test \
	-d LAST_NAME=User \
	-d BIRTH_DATE=1997-05-25 \
	-d _logic=Scripting \
	--data-urlencode _mainJavascriptFunction="function main() { for (var i = 0; i < responses.size(); i++) { if (responses.get(i).resultCode == 'APPROVED') { return (request.person.age >= 18 && request.person.age <= 30); } } return false; }" \
	https://preview.sheerid.com/rest/0.5/verification
```

Verifying that someone is at least 50 years old:
---

```
curl -H "Authorization: Bearer {yourBearerTokenHere}" \
	-d _affiliationTypes=AGE \
	-d FIRST_NAME=Test \
	-d LAST_NAME=User \
	-d BIRTH_DATE=1997-05-25 \
	-d _logic=Scripting \
	--data-urlencode _mainJavascriptFunction="function main() { for (var i = 0; i < responses.size(); i++) { if (responses.get(i).resultCode == 'APPROVED') { return (request.person.age >= 50); } } return false; }" \
	https://preview.sheerid.com/rest/0.5/verification
```

Example response for verifying that someone is at least 50 years old:
---

```
{
  "errors": [], 
  "timestamp": 1527281295833, 
  "requestId": "5b08768f2e8e862da37af1fb", 
  "status": "COMPLETE", 
  "result": true, 
  "metadata": {}, 
  "request": {
    "metadata": {}, 
    "timestamp": 1527281295813, 
    "config": {
      "rewardIds": [], 
      "consolationRewardIds": [], 
      "metadata": {
        "mainJavascriptFunction": "function main() { for (var i=0; i < responses.size(); i++) { if (responses.get(i).resultCode == 'APPROVED') { return (request.person.age > 25); } } return false; }", 
        "logic": "Scripting"
      }, 
      "affiliationTypes": [
        "AGE"
      ], 
      "verificationTypes": [
        "AUTHORITATIVE", 
        "ASSET_REVIEW"
      ], 
      "assetTypes": [
        "ID_CARD", 
        "OTHER", 
        "BIRTH_CERTIFICATE", 
        "OFFICIAL_LETTER", 
        "DATED_ID_CARD", 
        "DRIVERS_LICENSE"
      ], 
      "notifierIds": null, 
      "locale": "en_US"
    }, 
    "organization": null, 
    "userId": "5afdda3ecd9ad42f8b6611ed", 
    "personId": "5b08768f2e8e862da37af1fa", 
    "policyDefinitionValues": [
      {
        "policyName": "default", 
        "value": "5b08768f2e8e862da37af1fa"
      }
    ], 
    "assetMap": {}, 
    "revisions": 1, 
    "expirationDate": 1527886095813, 
    "active": false
  }, 
  "affiliations": [
    {
      "type": "AGE", 
      "organizationId": 0, 
      "organizationName": "UNKNOWN", 
      "updated": null, 
      "start": null, 
      "end": null, 
      "attributes": [], 
      "sourcePersonId": null
    }
  ], 
  "inactiveAffiliations": []
}
```
