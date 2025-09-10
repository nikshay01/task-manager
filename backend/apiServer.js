// apiServer.js
import express from 'express';
import { google } from 'googleapis';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://127.0.0.1:8080/oauth2callback';
const SCOPES = ['https://www.googleapis.com/auth/fitness.activity.read'];

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Step 1: Get Auth URL
app.get('/auth-url', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.send({ authUrl });
});

// Step 2: OAuth2 callback
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send('Authorization successful! You can close this window.');
  } catch (err) {
    console.error('Error getting tokens:', err);
    res.status(500).send('Error retrieving access token.');
  }
});

// Step 3: Fetch Steps Data (after authorization)
app.get('/steps', async (req, res) => {
  try {
    const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

    const now = Date.now();
    const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;

    const request = {
      userId: 'me',
      resource: {
        aggregateBy: [
          {
            dataTypeName: 'com.google.step_count.delta',
            dataSourceId:
              'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
          },
        ],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: oneWeekAgo,
        endTimeMillis: now,
      },
    };

    const response = await fitness.users.dataset.aggregate(request);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch steps');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
