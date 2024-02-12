import { Router } from "express";
import DownloadController from "../controller/downloadController.js";
import page404 from "../middleware/page404.js";
import authCheckMiddleware from "../middleware/authMiddleware/authCheckMiddleware.js";

const downloadRouter = Router();

downloadRouter.get('/downlaod-url',authCheckMiddleware, DownloadController.renderDownloadContent);
downloadRouter.post('/downlaod-urls-data',authCheckMiddleware, DownloadController.getDownloadedContent);
downloadRouter.post('/downlaod-content', authCheckMiddleware, DownloadController.downlaodedContent);
downloadRouter.all('/*', page404)


export default downloadRouter;
