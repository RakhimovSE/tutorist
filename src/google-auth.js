const { parsed: dotenv } = require('dotenv').config();
const { google } = require('googleapis');

/*******************/
/** CONFIGURATION **/
/*******************/

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

/*************/
/** HELPERS **/
/*************/

// TODO Сделать асинхронный вызов

function createConnection() {
  return new google.auth.OAuth2(
    dotenv.GOOGLE_CLIENT_ID,
    dotenv.GOOGLE_CLIENT_SECRET,
    dotenv.GOOGLE_REDIRECT_URL
  );
}

function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes
  });
}

/**********/
/** MAIN **/
/**********/

/**
 * Part 1: Create a Google URL and send to the client to log in the user.
 */

function urlGoogle() {
  const auth = createConnection();
  return getConnectionUrl(auth);
}

/**
 * Part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */

async function getGoogleAccountFromCode(code) {
  const auth = createConnection();
  const data = await auth.getToken(code);
  const tokens = data.tokens;
  auth.setCredentials(tokens);

  const people = google.people({
    version: 'v1',
    auth: auth,
  });

  const res = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses,names,photos',
  });

  return res.data;
}

module.exports = {
  urlGoogle,
  getGoogleAccountFromCode
}