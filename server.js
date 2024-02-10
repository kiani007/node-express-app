import { config } from "dotenv";
import express from 'express';
import logger from "./logger.js";
import errorHandler from "./middleware/errorHandler.js";
import router from "./routes/index.js";
import path from 'path';
import url from 'url';
import page404 from "./middleware/page404.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import flashMessages from './middleware/sessionFlash.js';
import loggingInterceptor from "./middleware/interceptors/loggingInterceptor.js";
import errorInterceptor from "./middleware/interceptors/errorInterceptor.js";

config();
const app = express();
const port = process.env.PORT || 3000;
const currentFileUrl = import.meta.url;
const currentFilePath = url.fileURLToPath(currentFileUrl);
const __dirname = path.dirname(currentFilePath);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(flashMessages);
app.use(loggingInterceptor);
app.use(errorInterceptor);
// view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// routes
app.use(router);
// 404
app.all('/*', page404);
// error handler for routes
app.use(errorHandler);
// start server
app.listen(port, () => {
	logger.info(`server is running on port ${port}`);
	console.log('http://localhost:3000')
})

