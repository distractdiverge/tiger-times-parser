import fs from 'fs';
import { google, AuthPlus } from 'googleapis';
import R from 'ramda';
import * as readline from 'readline';
import { getGoogleConfig, IOAuthCredentials } from './config';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {IOAuthCredentials} credentials The authorization client credentials.
 * @param {string} tokenPath
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials: IOAuthCredentials, tokenPath: string, callback: (client: AuthPlus) => void) => {
    const oAuth2Client: AuthPlus = new google.auth.OAuth2(
        credentials.clientId,
        credentials.clientSecret,
        R.head(credentials.redirectURIs),
    );

    // Check if we have previously stored a token.
    fs.readFile(tokenPath, (err, token) => {
      if (err) {
          return getNewToken(oAuth2Client, tokenPath, callback);
      }

      oAuth2Client.setCredentials(JSON.parse(token.toString()));
      callback(oAuth2Client);
    });
  };

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
export const getNewToken = (oAuth2Client: google.auth.OAuth2, tokenPath, callback: (client: AuthPlus) => void) => {
    const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', tokenPath);
        });
        callback(oAuth2Client);
      });
    });
};

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const listLabels = (auth: google.auth.OAuth2) => {
    const gmail = google.gmail({version: 'v1', auth});
    gmail.users.labels.list({
      userId: 'me',
    }, (err, res) => {
      if (err) {
          return console.log('The API returned an error: ' + err);
      }
      const labels = res.data.labels;
      if (labels.length) {
        console.log('Labels:');
        labels.forEach((label) => {
          console.log(`- ${label.name}`);
        });
      } else {
        console.log('No labels found.');
      }
    });
  }