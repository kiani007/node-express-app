import logger from "../logger.js"
import { HTTP_STATUS, STATUS_MESSAGE } from "../utils/httpStatus.js";

function errorHandler(err, req, res, next) {

  logger.error(err.stack);

  let statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let errorMessage = STATUS_MESSAGE.INTERNAL_SERVER_ERROR;

  if (err instanceof SyntaxError) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    errorMessage = STATUS_MESSAGE.BAD_REQUEST;
  } else if (err.name === STATUS_MESSAGE.VALIDATION_ERROR) {
    statusCode = HTTP_STATUS.UNPROCESSABLE_ENTITY;
    errorMessage = err.message;
  } else if (err.name === STATUS_MESSAGE.UNAUTHORIZED) {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    errorMessage = STATUS_MESSAGE.UNAUTHORIZED;
  } else if (err.name === STATUS_MESSAGE.FORBIDDEN) {
	  statusCode = HTTP_STATUS.FORBIDDEN;
	  errorMessage = STATUS_MESSAGE.FORBIDDEN;
  }

  res.status(statusCode).json({ error: errorMessage });
}

export default errorHandler