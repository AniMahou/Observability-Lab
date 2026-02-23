const winston = require('winston');
const path = require('path');

const createServiceLogger = (serviceName) => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: [
      // Writes to the shared logs folder we created
      new winston.transports.File({ 
        filename: path.join(__dirname, `../logs/${serviceName}.log`) 
      }),
      new winston.transports.Console({ format: winston.format.simple() })
    ],
  });
};

module.exports = createServiceLogger;