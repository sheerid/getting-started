## Rainier Outdoor: Using the SheerID API


<a href="http://rainieroutdoor.herokuapp.com">Click here</a> to visit a running version of Rainier Outdoor.

# About

This website was created for demonstration purposes.  It provides examples of how to use the SheerID API in the context of a running web application.

# Where do I find the website's calls to the SheerID API?

The <a href="https://github.com/sheerid/getting-started/blob/master/implementation/sheerid.js">sheerid.js</a> file contains all of the SheerID API calls and things that are related to those calls.  The functions inside of that file are called by the router in <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/index.js">index.js</a>, <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/student.js">student.js</a>, <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/military.js">military.js</a>, <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/teacher.js">teacher.js</a>, <a href="https://github.com/sheerid/getting-started/blob/master/implementation/routes/firstresponder.js">firstresponder.js</a>.  These files all make HTTP requests to the SheerID API.

# Deploying Locally

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

NOTE: This website will not be fully functional in your local environment until you add the following values to your environment:
- APITOKEN
- SECRETTOKEN
- STUDENT_TEMPLATE_ID
- TEACHER_TEMPLATE_ID
- MILITARY_TEMPLATE_ID
- FIRSTRESPONDER_TEMPLATE_ID
- STUDENT_EMAIL_NOTIFIER_ID
- TEACHER_EMAIL_NOTIFIER_ID
- MILITARY_EMAIL_NOTIFIER_ID
- FIRSTRESPONDER_EMAIL_NOTIFIER_ID

This means you will need a SheerID Sandbox account.  You will need to issue an API Token, a Secret Token, and then create templates and email notifiers for the affiliations listed above, then add those values to your environment (normally located in ~/.bash_profile) so that the code will work like you intend.  See the bottom of the sheerid.js file and look at the code snippets starting with ```process.env```.
