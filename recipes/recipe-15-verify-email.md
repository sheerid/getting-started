# SheerID API Recipes

## Email Verification

The following recipe demonstrates use of `EMAIL_LOOP` verification type. The end user will receive a confirmation code in an email link that will complete the verification.

## Build a SheerID-hosted Verify App

When creating your SheerID-hosted Verify App choose the `EMAIL_LOOP` verification type and any affiliation type. For ease of use it's also useful to add the organizationType and set organizationRequired to `Required` to the template configuration.

To complete an EMAIL_LOOP verification that is restricted to a specific set of email domains follow the [Recipe: Email Verification Whitelist](recipe-16-verify-email-whitelist.md).
