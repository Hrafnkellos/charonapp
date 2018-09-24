import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as os from 'os';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { morganOption } from '../api/config/winston.config';
import { morganJsonFormat, setTokens } from '../api/config/morgan.config';
import * as Sentry from '@sentry/node';

Sentry.init({ dsn: 'https://edd622d651324f54baa8c13f6809a5e5@sentry.io/1286393' });

const app = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json()); // support json encoded bodies
setTokens(morgan);
app.use(morgan(morganJsonFormat, morganOption));

app.get('/', (request, response) => {
    response.send("base endpoint for charon");
});

app.get('/healthcheck', (request, response) => {
    response.send({
        processUptime: process.uptime(),
        systemUptime: os.uptime()
    });
});

app.post('/credittransfer', (request, response) => {
    response.send("credit transfer success");
});

app.get('/error/:message', (req, res, next) => {
    // to test erros
    next(new Error(req.params.message));
});


app.use((err, req, res, next) => {
    Sentry.captureException(err);
    res.status(500).send({error: err.message});
})

export default app;