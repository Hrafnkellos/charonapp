import { createLogger, transports, format } from 'winston';
import { Options } from 'morgan';

const jsonString = info => {
  return Object.keys(info).reverse().reduce((acc, key, i) => {
    if (typeof key === 'string') {
      if (i > 0) acc += ', '
      if (info[key].slice(0,1) === '{') acc += `"${key}": ${info[key]}`;
      else acc += `"${key}": "${info[key]}"`;
    }
    return acc;
  }, '{ ').slice(0, -1) + ' }';
};

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `../app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: format.combine(
      format.printf(jsonString),
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: false,
    format: format.combine(
      format.colorize(),
      format.printf(jsonString), 
    ),
  },
};

// instantiate a new Winston Logger with the settings defined above
// export const logger = createLogger({
//   transports: [
//     // new transports.File(options.file),
//     new transports.Console(options.console)
//   ],
//   exitOnError: false, // do not exit on handled exceptions
// });


// And the code
export const morganOption: Options = {
  stream: {
    write: (message: string, encoding?:any) => {
        //logger.info(message);
        console.info(message);
    }
  }
}