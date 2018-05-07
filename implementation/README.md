## Rainier Outdoor: Using the SheerID API


<a href="http://rainieroutdoor.herokuapp.com">Click here</a> to visit a running version of Rainier Outdoor.

# About

This website was created for demonstration purposes.  It provides examples of how to use the SheerID API in the context of a running web application.

# Where do I find the website's calls to the SheerID API?

The <a href="https://github.com/sheerid/getting-started/blob/master/implementation/sheerid.js">sheerid.js</a> file contains all of the SheerID API calls and things that are related to those calls.  The functions inside of that file are called by the router in <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/index.js">index.js</a>, <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/student.js">student.js</a>, <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/military.js">military.js</a>, <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/teacher.js">teacher.js</a>, <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/firstresponder.js">firstresponder.js</a>.  These files all make HTTP requests to the SheerID API.

# Deploying Locally

This website will not be fully functional in your local environment.  This is because the Template IDs and Notifier IDs located in the sheerid.js file are specific to an account currently only accessible by Sam Oberg and Jamie Zimmerman (two SheerID developers).  This application references ```process.env.APITOKEN``` and ```process.env.SECRETTOKEN``` which are required for API calls which access those Template IDs and Notifier IDs.

These instructions assume you are using MacOS, although they could work for different operating systems.

Preqrequisites:

- Git, NodeJS, and MongoDB are installed.
- An instance of MongoDB is currently running on your computer.

Follow these steps if you want to deploy the project locally to make changes to it.

- Clone this repository: ```git clone https://github.com/sheerid/getting-started```
- Navigate to the implementation directory: ```cd implementation```
- Install the project's dependencies: ```node install```
- Launch the application: ```nodemon```

You should now be able to visit ```localhost:3000``` and see your local version of this application.  If PORT is defined in your local environment, visit ```localhost:{PORT}```.
