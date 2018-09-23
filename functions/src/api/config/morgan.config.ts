import { hostname} from 'os';
import { Morgan} from 'morgan';

export const setTokens = (morgan:Morgan) => {
    morgan.token('hostname', function getHostname() {
        return hostname();
    });

    morgan.token('pid', () => {
        return process.pid.toString();
    });

    morgan.token('type', (req, res) => { 
        return req.headers['content-type'] || 'none';
    });
};

export const morganJsonFormat = (tokens, req, res) => {
    return JSON.stringify({
        'method': tokens['method'](req, res),
        'url': tokens['url'](req, res),
        'response-time': tokens['response-time'](req, res) + "ms",
        'remote-address': tokens['remote-addr'](req, res),
        'time': tokens['date'](req, res, 'iso'),
        'http-version': tokens['http-version'](req, res),
        'status-code': tokens['status'](req, res),
        'content-length': tokens['res'](req, res, 'content-length'),
        'referrer': tokens['referrer'](req, res),
        'user-agent': tokens['user-agent'](req, res),
        'hostname': tokens['hostname'](req, res),
        'pid': tokens['pid'](req, res),
    });
}