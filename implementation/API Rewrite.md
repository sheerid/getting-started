#API Integration Best Practices

##Workflow


## Predesign considerations
When verifying university students, using a closed [combobox](http://developer.sheerid.com/jsapi/) is preferrable to an open entry field, as a valid organization ID is more likely to verify and avoid document review. A combobox will display schools in the United States by default. If your use case intends to verify students outside of the US, it is worth including a `Country` field, which can then be used to display combobox school options only in that country. 

## Control Center
Control Center should be used for creating web templates, reward pools, and email notifiers as it has greater control over configurations. Use the template Id as a parameter when issuing a verification request. 

Configure the body of an email notifier with your personal branding so as not to mislead the user into believing it is spam or phishing. 

We	recommend	providing	users	with the	option to upload additional documents in the event their	document is rejected by document review by including a try-again link in the Failure Email. This link should redirect users to the document upload page you have configured in your verification flow and include and uploadToken (part of the query string parameter) to be used with a new upload request.

