![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Validate success_url
------------------------------------

When a SheerID hosted verification application is configured to return the verified user to the customers website using the success_url template configuration the url will be signed using a secret token known only by SheerID and the account administrator. This allows the customer to validate that the url originated from SheerId and that the url was not tampered with.

If, for example, the success_url is:

    http://www.example.com/success/

Then the url will be added to with two url parameters.

  * *sheerid_salt* is a random string added to the url that assures it will always be unique.

  * *sheerid_security* is the sha256 hash of the success_url, sheerid_salt and the secret token.


The actual url the user will be redirected to upon successful verification will look something like:

    http://www.example.com/success/?sheerid_salt={random_string}&sheerid_security={sha256_hash}

The sheerid_security will be a hash of the acounts secret token and

    http://www.example.com/success/?sheerid_salt={random_string}

Validating success_url using python
------------------------------------

```python
import hashlib
import urlparse

def validateSheerIdSuccessUrl(url, secretToken):
  parsedUrl = urlparse.urlparse(url)
  sheerIdSecurity = urlparse.parse_qs(parsedUrl.query)['sheerid_security'][0]
  hashableUrl = url.replace('&sheerid_security=' + sheerIdSecurity, '')
  return hashlib.sha256(secretToken + hashableUrl).hexdigest() == sheerIdSecurity
```
