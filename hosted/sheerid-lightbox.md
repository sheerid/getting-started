![SheerID](https://s3.amazonaws.com/com.sheerid.resources/common/images/logo-sheerid-24.png)

# SheerID Lightbox

As a tool to help customers set up our verification form inside a popup lightbox, this javascript file can be inserted into a client's page as a `<script>` tag. To activate the lightbox after dropping the script tag onto the website, you would add the attribute `id="sheerid-lightbox-btn"` to the link or button you will use to activate the lightbox.

### Example:

	<a id="sheerid-lightbox-btn" class="button" href="javascript:void(0)">Click here to open lightbox</a>

To use the SheerID lightbox script, copy the script tag below and change the `data-target` attribute to point to your SheerID hosted template.

### Example:

	<script
		id="sheerid-script"
		src="https://s3.amazonaws.com/com.sheerid.resources/lightbox/js/sheerid-lightbox_1.0.min.js"
		data-target="https://verify-demo.sheerid.com/client-verify-form/">
	</script>


The script above will handle the creation, display, and dismissal of the SheerID lightbox that contains the verification form provided by the url described in the `data-target` attribute.

### Configuration
The lightbox script can accept a number of data attributes to modify the size and style of the lightbox to achieve the desired appearance and behavior.

1. `data-width`
	* Expected value : an integer for the width of the lightbox in pixels (px)
	* Default value : 960

2. `data-height`
	* Expected value : an integer for the height of the lightbox in pixels (px)
	* Default value : 600

3. `data-top`
	* Expected value : a string containing the position of the top of the lightbox specified as a % or in px
	* Default value : "10%"
	* Additional info : The lightbox is positioned absolutely and centered on the page

4. `data-stylesheet`
	* Expected value : a string containing the full url of the stylesheet to be included for the lightbox
	* Default value : SheerID hosted stylesheet

5. `data-closeBtnTxt`
	* Expected value : a string containing the text desired for the close button on the lightbox
	* Default value : ""

6. `data-closeBtnImg`
	* Expected value : a string containing the full url of the image to be used for the close button on the lightbox
	* Default value : SheerID hosted close button img
	* Additional info : If a value is provided for the closeBtnTxt then the lightbox will use that instead of the image. If you wish to use your own close button image, make sure that data-closeBtnTxt is absent so it will default to ""

7. `data-mobileRedirect`
	* Expected value : a string containing either "true" or "false"
	* Default value : "true"
	* Additional info : When set to "true", if the size of the user's viewport is less then the size specified in data-mobileThreshold, the lightbox will not be used and instead the user will be sent directly to the verification form. This is to help improve the user experience on mobile devices which often do not work well with popup windows due to the size and multiple window scrolling

8. `data-mobileThreshold`
	* Expected value : an integer value for the width in pixels (px) that the link should check against for redirecting to the verification template rather then displaying the lightbox
	* Default value : 600


### Example with multiple configuration changes:

	<script
		id="sheerid-script"
		src="https://s3.amazonaws.com/com.sheerid.resources/lightbox/js/sheerid-lightbox_1.0.min.js"
		data-target="https://verify-demo.sheerid.com/client-verify-form/"
		data-width="800"
		data-height="500"
		data-top="50px"
		data-mobileThreshold="568">
	</script>


Please see [the source file on GitHub](https://github.com/sheerid/getting-started/blob/master/hosted/sheerid-lightbox-example.html) to view a very simple html setup with a working example.













