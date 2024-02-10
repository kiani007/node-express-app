import logger from '../../logger.js';

const errorInterceptor = (err, req, res, next) => {
  logger.error(`Error occurred: ${err}`);

  if (res.headersSent) {
    return next(err);
	}
	
  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  res.json({
    error: {
      message: err.message || 'Internal Server Error',
      statusCode: statusCode
    }
  });
};

export default errorInterceptor;