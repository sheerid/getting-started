# SheerID Getting Started - Driver License Verification

## Service Details

### Resource URL

 * Sandbox: `https://services-sandbox.sheerid.com/rest/0.5/certification`
 * Production: `https://services.sheerid.com/rest/0.5/certification`

### Required parameters

 * `attribute.definition.identifier` (value: `AAMVA-ISSUER:AAMVA-DLDV-DEFINITION`)
 * `attribute.property.driverLicenseNumber` - the ID number from the document
 * `attribute.property.driverLicenseStateCode` - a 2-character state code (example: `FL`)
 * `_certifyAttributeTarget` (value: `false`)

### Optional parameters

Any of the following parameters may be supplied in addition to the above. If any of the following properties are supplied, they will be verified against the information from the document.

 * `attribute.property.addressCity`
 * `attribute.property.addressLine1`
 * `attribute.property.addressLine2`
 * `attribute.property.addressStateCode` (a 2-character state code - example: `FL`)
 * `attribute.property.addressZIP4`
 * `attribute.property.addressZIP5`
 * `attribute.property.documentCategory` (possible values: `DRIVER_LICENSE`, `PERMIT_ID_CARD`, `STATE_ID_CARD`)
 * `attribute.property.driverLicenseExpirationDate` (`YYYY-MM-DD` format)
 * `attribute.property.personBirthDate` (`YYYY-MM-DD` format)
 * `attribute.property.personEyeColor` (possible values: `BLK` = Black, `BLU` = Blue, `BRO` = Brown, `DIC` = Dichromatic, `GRY` = Gray, `GRN` = Green, `HAZ` = Hazel, `MAR` = Maroon, `PNK` = Pink)
 * `attribute.property.personFirstName`
 * `attribute.property.personHeight` (represented as an integer, the number of feet and inches - example: `510` to represent 5' 10")
 * `attribute.property.personLastName`
 * `attribute.property.personMiddleName`
 * `attribute.property.personNameSuffix`
 * `attribute.property.personSexCode` (`MALE` or `FEMALE`)
 * `attribute.property.personWeight` (represented as an integer, the number of pounds)

### Response 

ID number and issuing state are required for all submissions. If the ID number matches a valid state-issued document, verification of each subsequent attribute property provided is performed, and any discrepancies are noted in the `errors` array. If all the properties are a match, the `result` field is set to `true`, otherwise it will be `false`.

## Example - Verify ID number only

The following request demonstrates using the minimum data requirements to submit a transaction: ID number and issuing state.

### Request

````
$ curl -H "Authorization: Bearer $TOKEN" \
    https://services-sandbox.sheerid.com/rest/0.5/certification \
    -d attribute.definition.identifier=AAMVA-ISSUER:AAMVA-DLDV-DEFINITION -d _certifyAttributeTarget=false \
    -d attribute.property.driverLicenseStateCode=OR -d attribute.property.driverLicenseNumber=T3232
````

### Response

````{
    "errors": [
        {
            "code": 2001,
            "message": "driverLicenseNumber mismatch",
            "propertyName": "driverLicenseNumber"
        }
    ],
    "metadata": {},
    "request": {
        "attribute": {
            "attributeDefinitionIdentifier": "AAMVA-ISSUER:AAMVA-DLDV-DEFINITION",
            "attributeTarget": null,
            "identifier": null,
            "properties": [
                {
                    "name": "driverLicenseStateCode",
                    "value": "OR"
                },
                {
                    "name": "driverLicenseNumber",
                    "value": "F123456789"
                }
            ],
            "unqualifiedIdentifier": null
        },
        "config": {
            "consolationRewardIds": [],
            "metadata": {
                "certifyAttributeTarget": "false"
            },
            "rewardIds": []
        },
        "metadata": {},
        "timestamp": 1505870630669
    },
    "requestId": "59c1c326e4b0c45115bed665",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1505870630685
}
````

## Example: Verify all document properties

The following request demonstrates using all properties when submitting a transaction:

### Request

````
$ curl -H "Authorization: Bearer $TOKEN" \
    https://services-sandbox.sheerid.com/rest/0.5/certification \
    -d attribute.definition.identifier=AAMVA-ISSUER:AAMVA-DLDV-DEFINITION -d _certifyAttributeTarget=false \
    -d attribute.property.driverLicenseStateCode=OR \
    -d attribute.property.driverLicenseNumber=T3232 \
    -d "attribute.property.addressLine1=2451 Willamette Street" \
    -d "attribute.property.addressLine2=Suite 201" \
    -d attribute.property.addressCity=Eugene \
    -d attribute.property.addressStateCode=OR \
    -d attribute.property.addressZIP5=97405 \
    -d attribute.property.addressZIP4=0001 \
    -d attribute.property.documentCategory=DRIVER_LICENSE \
    -d attribute.property.driverLicenseExpirationDate=2019-05-01 \
    -d attribute.property.personBirthDate=1965-03-05 \
    -d attribute.property.personEyeColor=BRO \
    -d attribute.property.personFirstName=Test \
    -d attribute.property.personHeight=510 \
    -d attribute.property.personLastName=Driver \
    -d attribute.property.personMiddleName=Q \
    -d attribute.property.personNameSuffix=III \
    -d attribute.property.personSexCode=MALE \
    -d attribute.property.personWeight=200
````

### Response

````
{
    "errors": [],
    "metadata": {},
    "request": {
        "attribute": {
            "attributeDefinitionIdentifier": "AAMVA-ISSUER:AAMVA-DLDV-DEFINITION",
            "attributeTarget": null,
            "identifier": null,
            "properties": [
                {
                    "name": "personBirthDate",
                    "value": "1965-03-05"
                },
                {
                    "name": "addressLine1",
                    "value": "2451 Willamette Street"
                },
                {
                    "name": "addressLine2",
                    "value": "Suite 201"
                },
                {
                    "name": "personEyeColor",
                    "value": "BLU"
                },
                {
                    "name": "personSexCode",
                    "value": "MALE"
                },
                {
                    "name": "personLastName",
                    "value": "Driver"
                },
                {
                    "name": "addressZIP4",
                    "value": "0001"
                },
                {
                    "name": "driverLicenseNumber",
                    "value": "T3232"
                },
                {
                    "name": "driverLicenseExpirationDate",
                    "value": "2019-05-01"
                },
                {
                    "name": "personWeight",
                    "value": "200"
                },
                {
                    "name": "driverLicenseStateCode",
                    "value": "OR"
                },
                {
                    "name": "personMiddleName",
                    "value": "Q"
                },
                {
                    "name": "addressStateCode",
                    "value": "OR"
                },
                {
                    "name": "addressCity",
                    "value": "Eugene"
                },
                {
                    "name": "addressZIP5",
                    "value": "97405"
                },
                {
                    "name": "personFirstName",
                    "value": "Test"
                },
                {
                    "name": "documentCategory",
                    "value": "DRIVER_LICENSE"
                },
                {
                    "name": "personNameSuffix",
                    "value": "III"
                },
                {
                    "name": "personHeight",
                    "value": "510"
                }
            ],
            "unqualifiedIdentifier": null
        },
        "config": {
            "consolationRewardIds": [],
            "metadata": {
                "certifyAttributeTarget": "false"
            },
            "rewardIds": []
        },
        "metadata": {},
        "timestamp": 1505870541021
    },
    "requestId": "59c1c2cde4b052110156fde4",
    "result": true,
    "status": "COMPLETE",
    "timestamp": 1505870541061
}
````
