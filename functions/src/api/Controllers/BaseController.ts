import { Router } from 'express';
import * as os from 'os';

// Accounts
export default (logger:Console, PSD2:any) => {

  const routes = Router();

  routes.get('/', (req, res, next) => {
    res.send("base endpoint for charon");
  });

  routes.get('/healthcheck', (req, res, next) => {
    res.send({
      processUptime: process.uptime(),
      systemUptime: os.uptime()
    });
  });

  routes.get('/error/:message', (req, res, next) => {
    // to test erros
    next(new Error(req.params.message));
  });

  routes.get('/errors/:message', (req, res, next) => {
    next(new Error(req.params.message));
  });

  // Authorization

  routes.get('/login', (req, res, next) => {
    PSD2.Login();
    res.send('ok');
  });

  return routes;
}

