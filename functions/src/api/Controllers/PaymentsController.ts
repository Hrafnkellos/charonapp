import { Router } from 'express';
import { Payment } from '../Interfaces/Payment';

// Payments
export default (config:any, logger:Console, PSD2:any) => {

  const routes = Router();

  routes.get('/payments/domestic', async (req, res, next) => {
    try {
      res.send(await PSD2.Payments.GetPaymentsAsync());
    } catch (ex) {
      logger.log(ex);
      res.status(ex.response.data.error.httpCode).send(ex.response.data.error.failures);
    }
  });

  routes.get('/payments/domestic/:payment_id', async (req, res, next) => {
    res.send(await PSD2.Payments.GetPaymentAsync(req.params.payment_id));
  });

  routes.post('/payments/domestic', async (req, res, next) => {
    const payment = req.body as Payment;
    logger.log(payment);
    try {
      res.send(await PSD2.Payments.InitiatePaymentAsync(payment));
    } catch (ex) {
      logger.log(ex);
      res.status(ex.response.data.error.httpCode).send(ex.response.data.error.failures);
    }
  });

  routes.put('/payments/domestic/:payment_id', async (req, res, next) => {
    const id = req.params.payment_id;
    try {
      res.send(await PSD2.Payments.ConfirmPaymentAsync(id));
    } catch (ex) {
      logger.log(ex);
      res.status(ex.response.data.error.httpCode).send(ex.response.data.error.failures);
    }
  });

  return routes;
}
