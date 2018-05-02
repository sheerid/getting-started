# SheerID Getting Started - Driver License Certification

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

ID number and issuing state are required for all submissions. If the ID number matches a valid state-issued document, verification of each subsequent attribute property provided is performed, and any discrepancies are noted in the `errors` array.

If all the properties supplied are a match, the `result` field is set to `true`, otherwise it will be `false`. Clients wishing to evaluate a success/failure status based on a partial match of the supplied properties are encouraged to inspect property errors in the `errors` array to make their own determination, rather than rely on the simple derived `result` property.

## Sample Requests and Responses

### Example - Valid ID number

The following request demonstrates using the minimum data requirements to submit a transaction: ID number and issuing state.

#### Request

````
$ curl -H "Authorization: Bearer $TOKEN" \
    https://services-sandbox.sheerid.com/rest/0.5/certification \
    -d attribute.definition.identifier=AAMVA-ISSUER:AAMVA-DLDV-DEFINITION -d _certifyAttributeTarget=false \
    -d attribute.property.driverLicenseStateCode=OR -d attribute.property.driverLicenseNumber=T3232
````

#### Response

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
                    "name": "driverLicenseStateCode",
                    "value": "OR"
                },
                {
                    "name": "driverLicenseNumber",
                    "value": "T3232"
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
        "timestamp": 1506012094437
    },
    "requestId": "59c3ebbe0cf29ef9e97e7cf0",
    "result": true,
    "status": "COMPLETE",
    "timestamp": 1506012094449
}
````

### Example: Valid document with many properties tested

The following request demonstrates using all properties when submitting a transaction:

#### Request

````
$ curl -H "Authorization: Bearer $TOKEN" \
    https://services-sandbox.sheerid.com/rest/0.5/certification \
    -d attribute.definition.identifier=AAMVA-ISSUER:AAMVA-DLDV-DEFINITION -d _certifyAttributeTarget=false \
    -d attribute.property.driverLicenseStateCode=OR \
    -d attribute.property.driverLicenseNumber=D3232 \
    -d "attribute.property.addressLine1=2451 Willamette Street" \
    -d "attribute.property.addressLine2=PO Box 999" \
    -d attribute.property.addressCity=Dallas \
    -d attribute.property.addressStateCode=TX \
    -d attribute.property.addressZIP5=22222 \
    -d attribute.property.addressZIP4=4444 \
    -d attribute.property.documentCategory=DRIVER_LICENSE \
    -d attribute.property.driverLicenseExpirationDate=2018-05-01 \
    -d attribute.property.personBirthDate=1966-03-05 \
    -d attribute.property.personEyeColor=BRO \
    -d attribute.property.personFirstName=Test \
    -d attribute.property.personHeight=510 \
    -d attribute.property.personLastName=Driver \
    -d attribute.property.personMiddleName=P \
    -d attribute.property.personNameSuffix=Jr \
    -d attribute.property.personSexCode=FEMALE \
    -d attribute.property.personWeight=200
````

#### Response

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
                    "name": "addressLine1",
                    "value": "2451 Willamette Street"
                },
                {
                    "name": "addressZIP5",
                    "value": "22222"
                },
                {
                    "name": "personLastName",
                    "value": "Driver"
                },
                {
                    "name": "personBirthDate",
                    "value": "1966-03-05"
                },
                {
                    "name": "personMiddleName",
                    "value": "P"
                },
                {
                    "name": "driverLicenseNumber",
                    "value": "D3232"
                },
                {
                    "name": "personNameSuffix",
                    "value": "Jr"
                },
                {
                    "name": "driverLicenseExpirationDate",
                    "value": "2018-05-01"
                },
                {
                    "name": "personEyeColor",
                    "value": "BRO"
                },
                {
                    "name": "documentCategory",
                    "value": "DRIVER_LICENSE"
                },
                {
                    "name": "addressZIP4",
                    "value": "4444"
                },
                {
                    "name": "addressCity",
                    "value": "Dallas"
                },
                {
                    "name": "addressLine2",
                    "value": "PO Box 999"
                },
                {
                    "name": "personSexCode",
                    "value": "FEMALE"
                },
                {
                    "name": "personHeight",
                    "value": "510"
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
                    "name": "addressStateCode",
                    "value": "TX"
                },
                {
                    "name": "personFirstName",
                    "value": "Test"
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
        "timestamp": 1506011656652
    },
    "requestId": "59c3ea080cf29ef9e97e7cde",
    "result": true,
    "status": "COMPLETE",
    "timestamp": 1506011656717
}
````

### Example - Invalid ID number

The following request demonstrates a request with multiple attribute properties, but the ID number is not found

#### Request

````
$ curl -H "Authorization: Bearer $TOKEN" \
    https://services-sandbox.sheerid.com/rest/0.5/certification \
    -d attribute.definition.identifier=AAMVA-ISSUER:AAMVA-DLDV-DEFINITION -d _certifyAttributeTarget=false \
    -d attribute.property.driverLicenseStateCode=OR -d attribute.property.driverLicenseNumber=F4232 \
    -d attribute.property.addressCity=Dallas \
    -d attribute.property.addressStateCode=TX \
    -d attribute.property.personLastName=Driver
````

#### Response

````
{
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
                    "name": "personLastName",
                    "value": "Driver"
                },
                {
                    "name": "driverLicenseNumber",
                    "value": "F4232"
                },
                {
                    "name": "addressCity",
                    "value": "Dallas"
                },
                {
                    "name": "addressStateCode",
                    "value": "TX"
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
        "timestamp": 1506012254494
    },
    "requestId": "59c3ec5e0cf29ef9e97e7cf6",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1506012254530
}
````

### Example: Valid ID with property errors

The following request demonstrates using all properties when submitting a transaction, and receiving errors for some of the data because some of the supplied info does not match the data on the document.

#### Request

````
$ curl -H "Authorization: Bearer $TOKEN" \
    https://services-sandbox.sheerid.com/rest/0.5/certification \
    -d attribute.definition.identifier=AAMVA-ISSUER:AAMVA-DLDV-DEFINITION -d _certifyAttributeTarget=false \
    -d attribute.property.driverLicenseStateCode=OR \
    -d attribute.property.driverLicenseNumber=D3232 \
    -d "attribute.property.addressLine1=2451 Willamette Street" \
    -d "attribute.property.addressLine2=Suite 2" \
    -d attribute.property.addressCity=Dallas \
    -d attribute.property.addressStateCode=TX \
    -d attribute.property.addressZIP5=22222 \
    -d attribute.property.addressZIP4=3333 \
    -d attribute.property.documentCategory=DRIVER_LICENSE \
    -d attribute.property.driverLicenseExpirationDate=2019-05-01 \
    -d attribute.property.personBirthDate=1966-03-05 \
    -d attribute.property.personEyeColor=BLU \
    -d attribute.property.personFirstName=Test \
    -d attribute.property.personHeight=509 \
    -d attribute.property.personLastName=Driver \
    -d attribute.property.personMiddleName=Q \
    -d attribute.property.personNameSuffix=Jr \
    -d attribute.property.personSexCode=MALE \
    -d attribute.property.personWeight=199
````

#### Response

````
{
    "errors": [
        {
            "code": 2001,
            "message": "addressLine2 mismatch",
            "propertyName": "addressLine2"
        },
        {
            "code": 2001,
            "message": "driverLicenseExpirationDate mismatch",
            "propertyName": "driverLicenseExpirationDate"
        },
        {
            "code": 2001,
            "message": "personHeight mismatch",
            "propertyName": "personHeight"
        },
        {
            "code": 2001,
            "message": "personMiddleName mismatch",
            "propertyName": "personMiddleName"
        },
        {
            "code": 2001,
            "message": "personSexCode mismatch",
            "propertyName": "personSexCode"
        },
        {
            "code": 2001,
            "message": "personWeight mismatch",
            "propertyName": "personWeight"
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
                    "name": "personSexCode",
                    "value": "MALE"
                },
                {
                    "name": "personEyeColor",
                    "value": "BLU"
                },
                {
                    "name": "addressCity",
                    "value": "Dallas"
                },
                {
                    "name": "addressLine2",
                    "value": "Suite 2"
                },
                {
                    "name": "personMiddleName",
                    "value": "Q"
                },
                {
                    "name": "personHeight",
                    "value": "509"
                },
                {
                    "name": "addressZIP4",
                    "value": "3333"
                },
                {
                    "name": "addressStateCode",
                    "value": "TX"
                },
                {
                    "name": "documentCategory",
                    "value": "DRIVER_LICENSE"
                },
                {
                    "name": "addressLine1",
                    "value": "2451 Willamette Street"
                },
                {
                    "name": "driverLicenseNumber",
                    "value": "D3232"
                },
                {
                    "name": "personWeight",
                    "value": "199"
                },
                {
                    "name": "driverLicenseExpirationDate",
                    "value": "2019-05-01"
                },
                {
                    "name": "addressZIP5",
                    "value": "22222"
                },
                {
                    "name": "personLastName",
                    "value": "Driver"
                },
                {
                    "name": "personNameSuffix",
                    "value": "Jr"
                },
                {
                    "name": "personBirthDate",
                    "value": "1966-03-05"
                },
                {
                    "name": "personFirstName",
                    "value": "Test"
                },
                {
                    "name": "driverLicenseStateCode",
                    "value": "OR"
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
        "timestamp": 1506011953163
    },
    "requestId": "59c3eb310cf29ef9e97e7ced",
    "result": false,
    "status": "COMPLETE",
    "timestamp": 1506011953223
}
````

## Sandbox Testing

The sandbox environment is not connected to production data sources. Instead, this environment relies on mock data for testing purposes. Refer to the information below for rules:

| Attribute Property | Success value | Failure value |
|------------------------------------------|--------------------------------------|------------------------------------|
| `attribute.property.driverLicenseNumber` | starts with character other than `F` (ex: `2345282345`) | starts with `F` (ex: `F1234567`) |
| `attribute.property.documentCategory` | `driverLicenseNumber` starts with same initial character as the `documentCategory` (ex: `DRIVER_LICENSE` and `D123456`) | initial characters do not match (ex: `PERMIT_ID_CARD` and `D123456`) |
| `attribute.property.personSexCode` | `FEMALE` | `MALE` |
| _any date field_ | even year (ex: `2018-05-01`) | odd year (ex: `2019-02-04`) |
| _any integer field_ (`addressZIP5`, `addressZIP4`, `personHeight`, `personWeight`)| even integer (ex: `510`) | odd integer (ex: `509`) |
| _any other (string) field_ | initial character has an even character code point (ex: `Randall`) | initial character has an odd character code point (`Quincy`) |
