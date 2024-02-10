import logger from '../../logger.js'

const loggingInterceptor = (req, res, next) => {
const start = Date.now();

logger.info(`[${req.method}] ${req.url}`);

if (Object.keys(req.body).length > 0) {
logger.debug('Request body:', req.body);
}

if (Object.keys(req.query).length > 0) {
logger.debug('Query parameters:', req.query);
}

if (Object.keys(req.params).length > 0) {
logger.debug('Request parameters:', req.params);
}

if (Object.keys(req.headers).length > 0) {
logger.debug('Request headers:', req.headers);
}

res.on('finish', () => {
const duration = Date.now() - start;
const { statusCode } = res;

logger.info(`[${statusCode}] ${req.method} ${req.url} - ${duration}ms`);
});

next();
};

export default loggingInterceptor;
