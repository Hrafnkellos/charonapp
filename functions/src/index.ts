import * as functions from 'firebase-functions';
import app from './api/api'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const api = functions.https.onRequest(app);
