<html>
  <head>
    <style type='text/css'>label {display: block;} input {margin-bottom: 10px;}</style>
  </head>
  <body>
    <h1>SheerID Example Verification Form</h1>
    <form id='verification-form' action='military.php' method='POST'>
      <div>
        <label for='firstname'>First Name</label>
        <input type='text' name='firstname' id='firstname' ></input>
        <label for='lastname'>Last Name</label>
        <input type='text' name='lastname' id='lastname' ></input>
	<label for='servicetype'>Service Type</label>
	<input type='radio' name='servicetype' value='ACTIVE_DUTY' checked >Active Duty</input>
	<input type='radio' name='servicetype' value='VETERAN' >Veteran</input>
	<input type='radio' name='servicetype' value='RESERVIST' >Reservist/Guard</input>
        <label for='birthdate'>Date of Birth (YYYY-MM-DD)</label>
        <input type='text' name='birthdate' id='birthdate' ></input>
        <label for='separation'>Date of Separation (YYYY-MM-DD)</label>
        <input type='text' name='separationdate' id='separationdate' ></input>
      </div>
      <input class='submit-button' type='submit' />
    </form>
  </body>
</html>
