import { Router } from 'express';

// Accounts
export default (logger:Console, PSD2:any) => {

  const routes = Router();

  routes.get('/', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountsAsync());
  });

  routes.get('/:id', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountDetailsAsync(req.params.id));
  });

  routes.get('/:id/transactions', async (req, res, next) => {
    res.send(await PSD2.Accounts.GetAccountTransactionsAsync(req.params.id));
  });

  return routes;
}
