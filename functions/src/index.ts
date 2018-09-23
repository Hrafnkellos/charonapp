import * as functions from 'firebase-functions';
import app from './api/api'
import * as Request from 'request';


process.on('uncaughtException', function(err) {
    Request.post({ 
        url: "https://hooks.slack.com/services/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",
        json: {"text": `Exception: ${err}`}
    });
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const api = functions.https.onRequest(app);
