![SheerID](http://www.sheerid.com/wp-content/themes/sheerid/img/logo.png)

## SheerID Hosted Application in iFrame

### Initial integration

The code needed to load a SheerID Hosted Verification Application is minimal. It uses an industry-standard iFrame to load the content, and our application serves the user the configured workflow including success or failure messages. Our example will use jQuery, but any JavaScript framework should be able to accomplish the same behavior.

The bare minimum code to load our hosted app into an iFrame would look like this:

    <iframe src="https://myapp.sheerid.com" ></iframe>

That could be all the code necessary to simply place it in your page.

### Lightbox integration

In order to have this come up in a "lightbox" style dialog, a few steps are necessary. The start of the process is usually styled as a button inviting the user to register:

    <a class="button" href="index.html" data-lightbox-iframe="true">Register</a>

Connected to that link element would be JavaScript code to load and display the dialog:


       jQuery('[data-lightbox-iframe]').click(function(){
            var lb = ensureLightbox();
            lb.html('<iframe src="' + jQuery(this).prop('href') + '" class="lightbox-iframe"></iframe>')
            return false;
    });

This gets a lightbox object and loads it with the first HTML snippet we looked at. The lightbox is in charge of presenting it in an attractive way while still allowing your site to be seen. This enhances user comfort that the offer is legitimate.

An example of how a lightbox could be configured could be:


       jQuery(function(){
        var ensureLightbox = function() {
            var lb = jQuery('.lightbox');

            if (!lb.length) {
                var overlay = jQuery('<div class="overlay"></div>');
                var wrap = jQuery('<div class="lightbox-wrap"><a class="close" href="javascript:;"><span>Close</span></a></div>');
                lb = jQuery('<div class="lightbox"></div>');

                wrap.append(lb);
                jQuery('body').append(overlay).append(wrap);

                jQuery('.close', wrap).click(function(){
                    wrap.remove();
                    overlay.remove();
                    return false;
                });
            }
            return lb;
        }            
    });

Please see [the source file on GitHub](https://github.com/sheerid/getting-started/blob/master/hosted/example-iframe-page.html) for each of these items together in one HTML page.