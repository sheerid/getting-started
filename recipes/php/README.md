Example PHP usage
-----------------

This example makes use of the [SheerID PHP module](http://github.com/sheerid/sheerid-php), included here for convenience. You'll need an API key to use this demo.

To run this test, clone the repository or download these files, change to this directory and edit app.php so your API key is where the text YOUR_KEY_HERE. Then run:

    php -S localhost:8000 -t .

And point your browser to [http://localhost:8000/example.php](http://localhost:8000/example.php). Change the port number in the command and URL if needed for your local development environment.

Example birth dates for the Sandbox server are "2012-01-01" which will provide a successful result, and "2011-01-01" which will provide an unsuccessful result. Both will also display the response object that comes back from our service, so you can see what data is available.
