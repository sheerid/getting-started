# SheerID API Recipes
## REST Reporting

### Submit a report request: [Endpoint Information](http://developer.sheerid.com/docs/report/requestReport.html)

Example:

```
curl -H "Authorization: Bearer ${TOKEN}" \
-X POST \
-d startDate=2017-07-01 \
-d endDate=2017-07-31 \
-d fields=FIRST_NAME \
-d fields=LAST_NAME \
https://services.sheerid.com/rest/0.5/report
```

There are a number of parameters that can be used to customize the report output. Personally Identifiable Information (PII) can be included on a per field basis or all available data can be requested by using the fields=”*” wildcard. The PII returned will depend on the SheerID user roles the report requester has. Metadata submitted with requests can be included on the report by adding the metadata keys in the report request as a comma delimited list
`metaKeys=key1,key2,...`.

Example response:

```
{
“status”: “CREATED”,
“id”: “ 598251a1e4b04e63dacaaeaa”,
“requestTimestamp”: 1501712801422
}
```

### Poll the report to check its status: [Endpoint Information](http://developer.sheerid.com/docs/report/retrieveReport.html)

Example:

```
curl -H "Authorization: Bearer ${TOKEN}" \
https://services.sheerid.com/rest/0.5/report/598251a1e4b04e63dacaaeaa
```

Example response:

```
{
“status”: “REPORTING”,
“id”: “ 598251a1e4b04e63dacaaeaa”,
“requestTimestamp”: 1501712801422
}
```
Status of “REPORTING” indicates that the server is still processing the report.
When the status is “COMPLETE” then the report is ready to be fetched.

### Fetch the raw text/csv output: [Endpoint Information](http://developer.sheerid.com/docs/report/getReportData.html)

Example:

```
curl -H "Authorization: Bearer ${TOKEN}" \
https://services.sheerid.com/rest/0.5/report/598251a1e4b04e63dacaaeaa/raw
```

