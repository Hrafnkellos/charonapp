import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as os from 'os';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { morganOption } from '../api/config/winston.config';
import { morganJsonFormat, setTokens } from '../api/config/morgan.config';
import { error } from 'util';

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

app.get('/error', (request, response) => {
    throw new error("error test");
});

app.post('/credittransfer', (request, response) => {
    response.send("credit transfer success");
});

export default app;