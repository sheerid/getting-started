#API Integration Best Practices

# [Test Link](#spot)

## Workflow
The recommended user experience is as follows:

1. Promote exclusive benefits
2. Present the user with the ability to [verify](http://developer.sheerid.com/docs/#!/Verification/verify) their eligibility.
	+ If successful, move directly to the final step.
	+ If unable to instantly verify, present the user with an opportunity to correct their information and [resubmit](http://developer.sheerid.com/docs/#!/Verification/updateVerification).

3. If still unable to verify, present the user with the option to [upload documentation](http://developer.sheerid.com/docs/#!/Asset/upload) proving their eligibility.
4. Upon successful receipt of documents, notify the user that they will receive an update when verification is complete.
5. If eligibility cannot be confirmed with document review, notify the user with a reason why and invite them to upload a valid document. This should be done with an email notifier.
6. Upon successful document review, notify the user and provide a link to proceed to the final step.
7. The Final Step: present the user with a message indicating they have been verified and proceed to the next steps which are exclusive to eligible users.

Note that the above workflow may be asynchronous - a manual review of documents will result in a short delay (generally about 5 minutes, could take up to 20 minutes). It's important to consider this potential when deciding where in the process to place the eligibility verification. For best results, eligibility verification should occur at an early enough time in the conversion funnel to allow for some time to elapse between the initial verification attempt and a final document review response if necessary. Our customers have found success performing this check on a targeted landing page, at the time of account signup or when adding an item or a promo code to a shopping cart. It should not be performed during order finalization (like a credit card transaction), since you won't want to hold up the processing of the order.

## Access Token Security
The SheerID API access token(s) used to authenticate requests should be protected like a sensitive password. It should go without saying that this token should never be exposed on the client side or in any page's HTML source. Provisions should be made to store this value external to the source code so that it can be rotated periodically.


## Design considerations
###Persistence

When designing mockups of the user experience, be sure to visually display which information fields are required. Consult the [Required Verification Fields] (http://developer.sheerid.com/fields/) for a list of required and optional data for each type of verification you wish to perform.
It's preferable to maintain a relationship between the SheerID verification request performed and some object in your system, whether it be a registered user, a quote (shopping cart), or an order. This can done in one of two ways:
####1. Storing SheerID Attributes
Add additional fields in your database to store the following data points that are returned with a VerificationResponse:

+ `requestId` - the unique identifier for the SheerID verification request
+ `personId` - the unique identifier for the individual that was verified, can be used to track a individual's verification activity
+ `timestamp` -  when the verification occurred. For some affiliation types (students, employees) it is advantageous to periodically re-verify
+ `affiliations` - if your integration is handling multiple types of affiliations, this is helpful in presenting verified users with the appropriate benefits


####2. Using Request Metadata
Additional attributes (such as your site's customer ID, order ID, etc.) can be included with the verification request that is submitted to SheerID. This information is stored by SheerID with the verification request and can be obtained at any time by using the [Inquire](http://developer.sheerid.com/docs/#!/Verification/inquire) API method to fetch the verification response. These request metadata can also be included in bulk reports of verification activity. Even when using this technique to link SheerID activity with your system, it's recommended that your system store the Verification Request ID so that the additional attributes can be retrieved from SheerID.

### User Experience
If the type of verification you use requires an organizationId, we recommend you use an [Organization Combobox JSAPI component](http://developer.sheerid.com/jsapi/#module-combobox) or else obtain the [list of SheerID organizations](http://developer.sheerid.com/model/#!/Organization/listOrganizations) from the REST API so that you can help users select the Id that matches their organization. We recommend that you implement a closed combobox, which requires a dropdown selection of an organization. This guarantees the verification request will contain a valid organizationId and be less liklely to fail instant verification and get passed to document review.

When verifying students, a combobox will display universities in the United States by default. If your use case intends to verify students outside of the US, it is worth including a required `Country` field, which can then be used to display combobox school options only in that country. 


## Prevent Fraud and Abuse
### Same Person Limit
The samePersonLimit request configuration can be supplied to restrict the number of successful verifications performed by a single end-user. For example, by specifying the following additional request parameters when invoking the Verify method, a user would only be able to verify successfully once per 90 days:

```_samePersonLimit=1&_samePersonLimitExpiration=90```

If the same person limit policy has been exceeded, the request will not be completed and the Verify REST API resource method will return a 409 Conflict HTTP status code rather than a VerificationResponse JSON object.



## Technical Language Considerations
### Military Documents
Directly asking for military documents via upload is asking end-users to violate a federal regulation that prohibits members of the military from uploading reproduced images of their ID, or CAC card. This [article](https://www.army.mil/article/28452/photocopying_military_cac_ids_a_violation_of_federal_law) does a nice job summing it up. We still receive many military IDs, but we just can't legally ask for them.

Here are some examples of acceptable language when asking for military documents:

+ __General Example__: Upload any military documentation that shows first, last name, military status, and valid date (if active duty).
+ __Active Duty:__ Any document that proves you are currently serving under Title 10 Active Duty Orders for 30 days or more.
+ __Reservist:__ Any document that proves you are currently serving under Title 32 Active Duty Orders for 30 days or more.
+ __Military Retiree:__ Any document that proves you are a Retiree from the US Armed Forces, Disabled Veteran with a rating of 30% or higher, or a registered Military Dependent.
+ __Military Family:__ Any document that proves you are a registered Military Dependent.
+ __Veteran:__ Any document that proves you met the qualifications of military service and were honorably discharged.
+ __Disabled Veteran:__ Any document that proves you are a Retiree from the US Armed Forces, Disabled Veteran with a rating of 30% or higher, or a registered Military Dependent.

## Control Center
Control Center should be used for creating web templates, reward pools, and Notifiers as it has greater control over configurations and can be linked together. Use the web template `templateId` as a parameter when issuing a verification request so as to verify the user against that template.

We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include an uploadToken (part of the query string parameter) to be used with a new upload request.

You should use Control Center to create HTTP notifiers, but use the REST API to [update](http://dev.sheerid.com/docs/notifier/updateNotifier.html) it, specifying what filters (situations) in which to fire the notifier. We recommend to configure the notifier to not take any action upon specific events. For example, don't send an email to user that they have failed instant verification and should upload documents while they are being redirected to that step anyway.

## Emails
Configure the body of an email notifier with your personal branding so as not to mislead the user into believing it is spam or phishing. We use Apache Velocity to configure email content, which can be used in addition to HTML and CSS. See [here]() for more information on email styling.

Caution should be exercised when emailing your end-user a link back to the success step. For user experience reasons, it's important that the link takes the user back to a personalized destination which continues where they left off; however, it's important to take steps to prevent this user from being able to share that link and its associated restricted benefits (for example, a 25% discount) with other users.

The best way to handle this for applications that have user accounts is to store the in-progress verification request ID in the session or with the user account so that they can return to the verification workflow on a subsequent visit or session. If this strategy is used, the URL does not need to contain any state. If user accounts are not supported or desired in this workflow, a singleuse token or key should be generated and stored using one of the techniques described in the "Persistence" section above. URLs may then use the single-use token to allow the user to recover the state of their workflow in progress. Make sure to invalidate or destroy this token once the verification workflow has been completed.

## Document Upload
Document upload is a necessity in order to ensure a high-quality user experience for your integration. Submitting a document for review has three steps:

1. Perform a verification request to attempt instant verification.
2. We recommend showing the customer the information received (name, email, birthdate, other required fields) as an optional "Correct My Information" step before redirecting to document review.
3. Issue an [Asset Upload Token](http://developer.sheerid.com/jsapi/#module-asset) associated with the unsatisfied request.
4. Upload one or more documents for review. We recommend using our [JSAPI Asset Upload compontent](http://developer.sheerid.com/jsapi/#module-asset) to allow your user to submit their documents directly to SheerID. This simplifies the coding for you and improves the performance and security of the document transfer for your end-user.


## Document Review
We recommend that review of users' documents be performed by Sheer ID's team of document review specialists. Read [more]() on how to do this.

## Beneath this is garbage for testing

We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.
We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.
We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.
We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.
We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.
We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.
We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.
We	recommend	providing	users	with the	option to upload additional documents in the event their	<a name="spot">document</a> is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.
We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.

