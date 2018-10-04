import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as functions from 'firebase-functions';
import axios from 'axios';
import { morganOption } from '../api/config/winston.config';
import { morganJsonFormat, setTokens } from '../api/config/morgan.config';
import * as Sentry from '@sentry/node';
import { PSD2Resource } from './Resources/PSD2Resource';
import AccountsController from './Controllers/AccountsController';
import PaymentsController from './Controllers/PaymentsController';
import BaseController from './Controllers/BaseController';

Sentry.init({ dsn: 'https://edd622d651324f54baa8c13f6809a5e5@sentry.io/1286393' });
const logger = console;
const axiosInstance = axios.create();
const X_IBM_Client_ID:string = process.env.N_CLIENT_ID || functions.config().n.client_id;
const X_IBM_Client_Secret:string = process.env.N_CLIENT_SEACRET || functions.config().n.client_seacret;

const PSD2 = new PSD2Resource(axiosInstance, logger, X_IBM_Client_ID, X_IBM_Client_Secret);
const app = express();

// The error handler must be before any other error middleware
// @ts-ignore
app.use(Sentry.Handlers.errorHandler());

// enable cors
app.use(cors({ origin: true }));
// support json encoded bodies
app.use(bodyParser.json());
// add request logger
setTokens(morgan);
app.use(morgan(morganJsonFormat, morganOption));

// Base
app.use("", BaseController(logger, PSD2));

// Accounts
app.use('/accounts', AccountsController(logger, PSD2));

// Payments
app.use('/payments', PaymentsController(logger, PSD2));

// catch errors
app.use((err, req, res, next) => {
  Sentry.captureException(err);
  res.status(500).send({error: err.message});
});

export default app;
