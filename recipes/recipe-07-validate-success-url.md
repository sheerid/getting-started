![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

SheerID API Recipes
===================

Validate success_url
------------------------------------

When a SheerID hosted verification application is configured to return the verified user to the customers website using the success_url template configuration the url will be signed, allowing the customer to validate that the url originated from SheerId and that the url was not tampered with. The url will be signed using the account owners secret token, which can be access in the control panel under Access Tokens.

The success_url will be added to with two url parameters.

  * *sheerid_salt* is a random string added to the url that assures it will always be unique.

  * *sheerid_security* is a sha256 hash-based message authentication code (HMAC) of the success_url, sheerid_salt and the secret token.

The resulting signed url can be validated by parsing out the sheerid_security parameter, creating a SHA256 HMAC of the resulting url and comparing the calculated code to the sheerid_security parameter.

Validating success_url using python
------------------------------------

```python
import urlparse
import hashlib
import hmac

def validateSheerIdSuccessUrl(url, secretToken):
  parsedUrl = urlparse.urlparse(url)
  sheerIdSecurity = urlparse.parse_qs(parsedUrl.query)['sheerid_security'][0]
  hashableUrl = url.replace('&sheerid_security=' + sheerIdSecurity, '')
  return hmac.new(secretToken, msg=hashableUrl, digestmod=hashlib.sha256).hexdigest() == sheerIdSecurity
```
