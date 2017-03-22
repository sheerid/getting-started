# SheerID API Recipes

## Email Verification

The following recipes are provided to confirm that the user's email domain is valid. It is possible to confirm that the email's domain is whitelisted for the organization, that the email is accessible to the user, or both.

## Email domain whitelist validation

The VALIDATION verification type will return true if the users email address has a domain that is whitelisted for the organization.

    curl -k -H "Authorization: Bearer {AccessToken}"\
        -d "organizationId=123456789"\ 
        -d _affiliationTypes=STUDENT_FULL_TIME\ 
        -d "EMAIL=joe@whitelisted-domain.com"\ 
        -d _verificationTypes=VALIDATION\ 
        https://services.sheerid.com/rest/0.5/verification

## Email domain whitelist and email loop

The high assurance level VALIDATION will first validate that the email domain is whitelisted and return true after collecting a challenge code from the user and the challenge answer is posted.

    curl -k -H "Authorization: Bearer {AccessToken}"\
        -d "organizationId=123456789"\ 
        -d _affiliationTypes=STUDENT_FULL_TIME\ 
        -d "EMAIL=joe@whitelisted-domain.com"\ 
        -d _verificationTypes=VALIDATION\ 
        -d _assuranceLevel=HIGH\ 
        https://services.sheerid.com/rest/0.5/verification

## Email ownership verification

The EMAIL_LOOP verification type will return true after collecting the email verification code from the user and posting it to the challenge api.

    curl -k -H "Authorization: Bearer {AccessToken}"\
        -d "organizationId=123456789"\ 
        -d _affiliationTypes=STUDENT_FULL_TIME\ 
        -d "EMAIL=joe@whitelisted-domain.com"\ 
        -d _verificationTypes=EMAIL_LOOP\ 
        https://services.sheerid.com/rest/0.5/verification

## Answering email loop challenge question

If confirming the ownership of an email it will be necessary to collect the challenge code from the user and submit it to the challenge api.

    curl -k -H "Authorization: Bearer {AccessToken}"\ 
        https://services.sheerid.com/rest/0.5/challenge?requestId={requestId}

Example Response:

    {
        "id":"58d16ea40cf25d6b78217acc",
        "questions":[
            {
                "id":"58d16ea40cf25d6b78217aca",
                "questionText":"Thank you.<br>Please check your email to verify your email address. If you do not receive an email, please check your junk/spam folder.",
               "choices":null
            }
        ]
    }

Once the challenge code is provided by the user it can be posted to the api to complete the verification.

    curl -k -H "Authorization: Bearer {AccessToken}"\
        -d 58d16ea40cf25d6b78217aca={challengeCode}\
        https://services.sheerid.com/rest/0.5/challenge/58d16ea40cf25d6b78217acc
