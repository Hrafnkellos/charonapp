import { Router } from 'express';
import { Payment } from '../Interfaces/Payment';

// Payments
export default (logger:Console, PSD2:any) => {

  const routes = Router();

  routes.get('/domestic', async (req, res, next) => {
    try {
      res.send(await PSD2.Payments.GetPaymentsAsync());
    } catch (ex) {
      logger.log(ex);
      res.status(ex.response.data.error.httpCode).send(ex.response.data.error.failures);
    }
  });

  routes.get('/domestic/:payment_id', async (req, res, next) => {
    try {
      res.send(await PSD2.Payments.GetPaymentAsync(req.params.payment_id));
    } catch (ex) {
      logger.log(ex);
      res.status(ex.response.data.error.httpCode).send(ex.response.data.error.failures);
    }
  });

  routes.post('/domestic', async (req, res, next) => {
    try {
      const payment = req.body as Payment;
      logger.log(payment);
      res.send(await PSD2.Payments.InitiatePaymentAsync(payment));
    } catch (ex) {
      logger.log(ex);
      res.status(ex.response.data.error.httpCode).send(ex.response.data.error.failures);
    }
  });

  routes.put('/domestic/:payment_id', async (req, res, next) => {
    try {
      const id = req.params.payment_id;
      res.send(await PSD2.Payments.ConfirmPaymentAsync(id));
    } catch (ex) {
      logger.log(ex);
      res.status(ex.response.data.error.httpCode).send(ex.response.data.error.failures);
    }
  });

  return routes;
}
