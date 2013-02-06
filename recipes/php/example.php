<html>
  <head>
    <style type='text/css'>label {display: block;} input {margin-bottom: 10px;}</style>
  </head>
  <body>
    <h1>SheerID Example Verification Form</h1>
    <form id='verification-form' action='app.php' method='POST'>
      <div>
        <label for='firstname'>First Name</label>
        <input type='text' name='firstname' id='firstname' ></input>
        <label for='lastname'>Last Name</label>
        <input type='text' name='lastname' id='lastname' ></input>
        <label for='birthdate'>Date of Birth (YYYY-MM-DD)</label>
        <input type='text' name='birthdate' id='birthdate' ></input>
        <label for='birthdate'>Organization ID (example: 3640 for University of Oregon)</label>
        <input type='text' name='organization' id='organization' value="3640" ></input>
      </div>
      <input class='submit-button' type='submit' />
    </form>
  </body>
</html>
