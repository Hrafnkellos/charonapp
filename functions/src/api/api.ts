import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as os from 'os';
import * as morgan from 'morgan';
import * as cors from 'cors';
import axios from 'axios';
import { morganOption } from '../api/config/winston.config';
import { morganJsonFormat, setTokens } from '../api/config/morgan.config';
import * as Sentry from '@sentry/node';
import { PSD2Resource } from './Resources/PSD2Resource';

Sentry.init({ dsn: 'https://edd622d651324f54baa8c13f6809a5e5@sentry.io/1286393' });
const logger = console;
const axiosInstance = axios.create();
const X_IBM_Client_ID:string = process.env.N_CLIENT_ID;
const X_IBM_Client_Secret:string = process.env.N_CLIENT_SEACRET;

const PSD2 = new PSD2Resource(axiosInstance, logger, X_IBM_Client_ID, X_IBM_Client_Secret);
const app = express();

// The error handler must be before any other error middleware
// @ts-ignore
app.use(Sentry.Handlers.errorHandler());

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

app.get('/errors/:message', (req, res, next) => {
    next(new Error(req.params.message));
});

app.get('/login', (req, res, next) => {
    PSD2.Login();
})

app.get('/accounts', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountsAsync());
})

app.get('/accounts/:id', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountDetailsAsync(req.params.id));
})

app.get('/accounts/:id/transactions', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountTransactionsAsync(req.params.id));
})

app.use((err, req, res, next) => {
    Sentry.captureException(err);
    res.status(500).send({error: err.message});
});

export default app;