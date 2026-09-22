# Register a Daikin developer app

1. Sign up at [developer.cloud.daikineurope.com](https://developer.cloud.daikineurope.com) with the
   same account you use in the Onecta app.
2. Create an application and set its redirect URI to
   `https://raycast.com/redirect?packageName=Extension` — this is the static
   redirect URL Raycast uses for every extension.
3. Copy the generated **Client ID** and **Client Secret** into the fields on the left.

Raycast then opens the Daikin login in your browser once, and stores the token
for you. Note that Daikin limits each application to 200 API requests per day.
