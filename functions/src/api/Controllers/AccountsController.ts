import { Router } from 'express';

// Accounts
export default (config:any, logger:Console, PSD2:any) => {

  const routes = Router();

  routes.get('/accounts', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountsAsync());
  });

  routes.get('/accounts/:id', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountDetailsAsync(req.params.id));
  });

  routes.get('/accounts/:id/transactions', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountTransactionsAsync(req.params.id));
  });

  return routes;
}
