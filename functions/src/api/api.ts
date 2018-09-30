import * as express from 'express';
import * as functions from 'firebase-functions';
import * as bodyParser from 'body-parser';
import * as os from 'os';
import * as morgan from 'morgan';
import * as cors from 'cors';
import axios from 'axios';
import { morganOption } from '../api/config/winston.config';
import { morganJsonFormat, setTokens } from '../api/config/morgan.config';
import * as Sentry from '@sentry/node';
import { PSD2Resource } from './Resources/PSD2Resource';
import { Payment } from './Interfaces/Payment';

Sentry.init({ dsn: 'https://edd622d651324f54baa8c13f6809a5e5@sentry.io/1286393' });
const logger = console;
const axiosInstance = axios.create();
const X_IBM_Client_ID:string = functions.config().n.client_id;
const X_IBM_Client_Secret:string = functions.config().n.client_seacret;

const PSD2 = new PSD2Resource(axiosInstance, logger, X_IBM_Client_ID, X_IBM_Client_Secret);
const app = express();

// The error handler must be before any other error middleware
// @ts-ignore
app.use(Sentry.Handlers.errorHandler());

app.use(cors({ origin: true }));

app.use(bodyParser.json()); // support json encoded bodies
setTokens(morgan);
app.use(morgan(morganJsonFormat, morganOption));

// system

app.get('/', (req, res, next) => {
  res.send("base endpoint for charon");
});

app.get('/healthcheck', (req, res, next) => {
  res.send({
    processUptime: process.uptime(),
    systemUptime: os.uptime()
  });
});

app.get('/error/:message', (req, res, next) => {
  // to test erros
  next(new Error(req.params.message));
});

app.get('/errors/:message', (req, res, next) => {
  next(new Error(req.params.message));
});

// Authorization

app.get('/login', (req, res, next) => {
  PSD2.Login();
  res.send('ok');
});

// Accounts

app.get('/accounts', async (req, res, next) => {
  res.send(await PSD2.Accounts.GetAccountsAsync());
});

app.get('/accounts/:id', async (req, res, next) => {
  res.send(await PSD2.Accounts.GetAccountDetailsAsync(req.params.id));
});

app.get('/accounts/:id/transactions', async (req, res, next) => {
  res.send(await PSD2.Accounts.GetAccountTransactionsAsync(req.params.id));
});

// Payments

app.get('/payments/domestic', async (req, res, next) => {
  res.send(await PSD2.Payments.GetPaymentsAsync());
});

app.get('/payments/domestic/:payment_id', async (req, res, next) => {
  res.send(await PSD2.Payments.GetPaymentAsync(req.params.payment_id));
});

app.post('/payments/domestic', async (req, res, next) => {
  const payment = req.body as Payment;
  logger.log(payment);
  try {
    res.send(await PSD2.Payments.InitiatePaymentAsync(payment));
  } catch (ex) {
    logger.log(ex);
    res.status(ex.response.data.error.httpCode).send(ex.response.data.error.failures);
  }
});

app.put('/payments/domestic/:payment_id', async (req, res, next) => {
  const id = req.params.payment_id;
  res.send(await PSD2.Payments.ConfirmPaymentAsync(id));
});

// catch errors

app.use((err, req, res, next) => {
  Sentry.captureException(err);
  res.status(500).send({error: err.message});
});

export default app;
