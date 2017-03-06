# SheerID API Recipes

## Email Verification Whitelist

The following recipe demonstrates use of the high assurance `VALIDATION` verification type. The end user will receive a confirmation code in an email link that will complete the verification provide they supply an email within the organization's domain whitelist.

## Build a SheerID-hosted Verify App

When creating your SheerID-hosted Verify App choose the `VALIDATION` verification type and any affiliation type. Additionally enter assuranceLevel and set it to `high` which will not only validate that the user has entered an email within a whitelisted set of domains, but also confirm the users ownership of the email by performing an `EMAIL_LOOP` verification. For ease of use it's also useful to add the organizationType and set organizationRequired to `Required` to the template configuration.

Open up the Organization Management tool and either add a new organization or edit an existing organization. Under the section `Email Domain(s)` enter one or more email domains to whitelist their use.

To complete an EMAIL_LOOP verification without a specific set of email domains follow the [Recipe: Email Verification](recipe-16-verify-email.md).
