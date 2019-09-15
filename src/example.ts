import gmailService from './gmail.service';
import { getGoogleConfig } from './config';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

gmailService.authorize(getGoogleConfig(), gmailService.listLabels);